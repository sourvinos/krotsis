using System.IO;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace API.Infrastructure.Logging {

    [ProviderAlias("File")]

    public class FileLoggerProvider : ILoggerProvider {

        public readonly FileLoggerOptions Options;
        private bool disposedValue;

        public FileLoggerProvider(IOptions<FileLoggerOptions> options) {
            Options = options.Value;
            if (!Directory.Exists(Options.FolderPath)) {
                Directory.CreateDirectory(Options.FolderPath);
            }
        }

        public ILogger CreateLogger(string categoryName) {
            return new FileLogger(this);
        }

        protected virtual void Dispose(bool disposing) {
            if (!disposedValue) {
                disposedValue = true;
            }
        }

        public void Dispose() {
            Dispose(disposing: true);
            System.GC.SuppressFinalize(this);
        }

    }

}