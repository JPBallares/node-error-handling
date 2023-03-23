import { Server } from 'http';
import logger from './logger';

interface TerminateOptions {
  coredump?: boolean;
  timeout?: number;
}

type ExitFunction = (code: number) => void;
type TerminateCallback = (err: Error | null, promise?: Promise<any>) => void;

function terminate(server: Server, options: TerminateOptions = { coredump: false, timeout: 500 }): (code: number, reason?: string) => TerminateCallback {
  // Exit function
  const exit: ExitFunction = (code) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason?: string) => (err: Error | null, promise?: Promise<any>) => {
    if (err instanceof Error) {
      // Log error information, use a proper logging library here :)
      logger.error(err.message, err.stack);
    }

    // Attempt a graceful shutdown
    server.close(() => exit(code));
    const timer = setTimeout(exit, options.timeout!);
    clearTimeout(timer);
  };
}

export default terminate;
