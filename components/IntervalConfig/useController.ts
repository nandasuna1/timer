import { useState } from "react";

interface WorkoutConfig {
    runTime: number;
    walkTime: number;
    rounds: number;
}

interface UseControllerProps {
    onStartWorkout: (config: WorkoutConfig) => void;
}

export const useController = ({ onStartWorkout }: UseControllerProps) => {
    const [runMinutes, setRunMinutes] = useState(1);
    const [runSeconds, setRunSeconds] = useState(0);
    const [walkMinutes, setWalkMinutes] = useState(0);
    const [walkSeconds, setWalkSeconds] = useState(30);
    const [rounds, setRounds] = useState(5);
  
    const handleStart = () => {
      const config: WorkoutConfig = {
        runTime: runMinutes * 60 + runSeconds,
        walkTime: walkMinutes * 60 + walkSeconds,
        rounds,
      };
      onStartWorkout(config);
    };
  
    const totalTime =
      (runMinutes * 60 + runSeconds + walkMinutes * 60 + walkSeconds) * rounds;
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = totalTime % 60;

    return { 
        runMinutes, 
        runSeconds, 
        walkMinutes, 
        walkSeconds, 
        rounds, 
        handleStart, 
        totalTime, 
        totalMinutes, 
        totalSeconds,
        setRunMinutes,
        setRunSeconds,
        setWalkMinutes,
        setWalkSeconds,
        setRounds,
    }
}