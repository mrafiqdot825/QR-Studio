type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class LoggerService {
  private isDev = __DEV__;

  public debug(message: string, ...args: unknown[]): void {
    if (this.isDev) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  public info(message: string, ...args: unknown[]): void {
    if (this.isDev) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  public error(message: string, error?: unknown, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, error ?? '', ...args);
    // Hook for production crash reporting (e.g. Sentry, Bugsnag) in release builds
  }
}

export const Logger = new LoggerService();
