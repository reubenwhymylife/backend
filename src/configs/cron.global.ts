import { ScheduledTask } from "node-cron";

declare module 'node-cron' {
    export function schedule(
      cronExpression: string,
      func: ((now: Date | 'manual' | 'init') => void) | string,
      options?: any
    ): ScheduledTask;
  }
  