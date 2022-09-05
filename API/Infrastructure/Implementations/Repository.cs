using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using API.Infrastructure.Classes;
using API.Infrastructure.Interfaces;
using API.Infrastructure.Responses;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

namespace API.Infrastructure.Implementations {

    public class Repository<T> : IRepository<T> where T : class {

        protected readonly AppDbContext context;
        private readonly ILogger<Repository<T>> logger;

        public Repository(AppDbContext context) {
            this.context = context;
        }

        public async Task<IEnumerable<T>> Get(Expression<Func<T, bool>> expression) {
            return await context.Set<T>().Where(expression).ToListAsync();
        }

        public async Task<IEnumerable<T>> GetActive(Expression<Func<T, bool>> expression) {
            return await context.Set<T>().Where(expression).ToListAsync();
        }

        public async Task<T> GetById(int id) {
            var entity = await context.Set<T>().FindAsync(id);
            if (entity != null) {
                return entity;
            } else {
                throw new CustomException { HttpResponseCode = 404 };
            }
        }

        public void Create(T entity) {
            var stopwatch = new Stopwatch();
            stopwatch.Start();
            using var transaction = context.Database.BeginTransaction();
            context.Add(entity);
            Save();
            DisposeOrCommit(transaction);
            stopwatch.Stop();
            logger.LogInformation("Create completed in {}", stopwatch.ElapsedMilliseconds);
        }

        public void Update(T entity) {
            using var transaction = context.Database.BeginTransaction();
            context.Entry(entity).State = EntityState.Modified;
            Save();
            DisposeOrCommit(transaction);
        }

        public void Delete(T entity) {
            if (entity != null) {
                using var transaction = context.Database.BeginTransaction();
                try {
                    RemoveEntity(entity);
                    Save();
                    DisposeOrCommit(transaction);
                } catch (Exception) {
                    throw new CustomException { HttpResponseCode = 491 };
                }
            } else {
                throw new CustomException { HttpResponseCode = 404 };
            }
        }

        private void Save() {
            context.SaveChanges();
        }

        private void RemoveEntity(T entity) {
            context.Remove(entity);
        }

        private static void DisposeOrCommit(IDbContextTransaction transaction) {
            transaction.Commit();
        }

    }

}