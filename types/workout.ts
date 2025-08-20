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
