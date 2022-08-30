using API.Infrastructure.Classes;
using API.Infrastructure.Implementations;

namespace API.Features.Settings {

    public class SettingsRepository : Repository<Settings>, ISettingsRepository {

        public SettingsRepository(AppDbContext appDbContext) : base(appDbContext) {
        }

    }

}