// types/workout.ts
export interface WorkoutConfig {
  runTime: number; // em segundos
  walkTime: number;
  rounds: number;
}

export enum Phase {
  RUN = 'run',
  WALK = 'walk',
  COMPLETE = 'complete',
}


type TimerStatus = "idle" | "running" | "paused";

export interface TimerState {
  status: TimerStatus;
  startTime: number | null; // quando iniciou
  pausedTime: number | null; // quando pausou
  duration: number; // em segundos
}

