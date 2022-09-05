using System;
using System.Reflection;
using System.Text;
using API.Infrastructure.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace API.Infrastructure.Logging {

    public static class LoggerExtensions {

        #region Public methods

        public static ILoggingBuilder FileLogger(this ILoggingBuilder builder, Action<FileLoggerOptions> configure) {
            builder.Services.AddSingleton<ILoggerProvider, FileLoggerProvider>();
            builder.Services.Configure(configure);
            return builder;
        }

        public static void LogException(int id, ILogger logger, ControllerContext context, object record, Exception exception) {
            if (record == null) {
                LogRecordNotFound(id, logger, context);
                return;
            }
            if (exception == null) {
                LogInvalidModel(record, logger, context);
                return;
            }
            if (exception is DbUpdateException) {
                LogDatabaseError(record, logger, context, exception);
                return;
            }
        }

        public static void LogException(string id, ILogger logger, ControllerContext context, object record, Exception exception) {
            if (record == null) {
                LogRecordNotFound(id, logger, context);
                return;
            }
            if (exception == null) {
                LogInvalidModel(record, logger, context);
                return;
            }
            if (exception is DbUpdateException) {
                LogDatabaseError(record, logger, context, exception);
                return;
            }
        }

        public static void LogInfo(ILogger logger, ControllerContext context, object record) {
            LogRecordSaved(record, logger, context);
        }

        #endregion

        #region Private methods

        private static string GetControllerAndActionName(ControllerContext context) {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.Append('\t');
            sb.Append("Controller: " + context.ActionDescriptor.ControllerName);
            sb.AppendLine();
            sb.Append('\t');
            sb.Append("Action: " + context.ActionDescriptor.ActionName);
            return sb.ToString();
        }

        private static string GetObjectProperties(object myObject) {
            var sb = new StringBuilder();
            PropertyInfo[] properties = myObject.GetType().GetProperties();
            foreach (PropertyInfo p in properties) {
                sb.AppendLine();
                sb.Append('\t');
                sb.Append(string.Format(" - {0}: {1}", p.Name, p.GetValue(myObject, null)));
            }
            return sb.ToString();
        }

        private static string GetDatabaseError(Exception exception) {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.Append('\t');
            sb.Append("Error: " + exception.InnerException.Message);
            return sb.ToString();
        }

        private static string GetSimpleDescription(string description) {
            var sb = new StringBuilder();
            sb.AppendLine();
            sb.Append('\t');
            sb.Append("Error: " + description);
            return sb.ToString();
        }

        private static void LogDatabaseError(object record, ILogger logger, ControllerContext context, Exception exception) {
            logger.LogError("{caller} {error} {record}",
                GetControllerAndActionName(context),
                GetDatabaseError(exception),
                GetObjectProperties(record));
        }

        private static void LogInvalidModel(object record, ILogger logger, ControllerContext context) {
            logger.LogError("{caller} {error} {record}",
                GetControllerAndActionName(context),
                GetSimpleDescription(ApiMessages.InvalidModel()),
                GetObjectProperties(record));
        }

        private static void LogRecordNotFound(string id, ILogger logger, ControllerContext context) {
            logger.LogError("{caller} {error}", GetControllerAndActionName(context), GetSimpleDescription($"Id {id} not found"));
        }

        private static void LogRecordNotFound(int id, ILogger logger, ControllerContext context) {
            logger.LogError("{caller} {error}", GetControllerAndActionName(context), GetSimpleDescription($"Id {id} not found"));
        }

        private static void LogRecordSaved(object record, ILogger logger, ControllerContext context) {
            logger.LogInformation("{caller} {record}",
                GetControllerAndActionName(context),
                GetObjectProperties(record));
        }

        #endregion

    }

}