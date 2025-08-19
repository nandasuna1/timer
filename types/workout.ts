// types/workout.ts
export interface WorkoutConfig {
  runTime: number; // em segundos
  walkTime: number;
  rounds: number;
}

export type Phase = 'run' | 'walk' | 'complete';
