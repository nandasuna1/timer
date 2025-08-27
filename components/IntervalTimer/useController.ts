import { clearTimeStamp, getCurrentTimeStamp, setCurrentTimeStamp } from "@/data/localStorage/activityTimeStamp";
import { clearTimerState, setCurrentTimerState } from "@/data/localStorage/timerData";
import { useSound } from "@/hooks/useSound";
import { Phase } from "@/types/workout";
import { cancelAllNotifications, scheduleNotificationInBatch } from "@/utils/notifications";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Vibration } from "react-native";


interface IProps {
  config: {
    runTime: number;
    walkTime: number;
    rounds: number;
  };
  onEndWorkout: () => void;
}

export const useController = ({ config, onEndWorkout }: IProps) => {
  const { play } = useSound();

  const [currentRound, setCurrentRound] = useState(1);
  const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.RUN);
  const [secondsRemainingInCurrentPhase, setSecondsRemainingInCurrentPhase] = useState(config.runTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<number | null>(null);
  

  const currentPhaseTime =
    currentPhase === Phase.RUN ? config.runTime : config.walkTime;

  const progress =
    (currentPhaseTime - secondsRemainingInCurrentPhase) / currentPhaseTime;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // ---- controle de timer ----
  const handlePhaseTransition = useCallback(() => {
    Vibration.vibrate();
    play();

    if (currentPhase === Phase.RUN) {
      setCurrentPhase(Phase.WALK);
      // schedulePushNotification();
    } else {
      if (currentRound < config.rounds) {
        setCurrentRound((r) => r + 1);
        setCurrentPhase(Phase.RUN);
        // schedulePushNotification();
      } else {
        setCurrentPhase(Phase.COMPLETE);
        setIsRunning(false);
        onEndWorkout();
      }
    }
  }, [play, currentPhase, currentRound, config.rounds, onEndWorkout]);

  const tick = useCallback(() => {
    setSecondsRemainingInCurrentPhase((prev) => {
      if (prev <= 1) {
        return currentPhase === Phase.RUN
          ? config.walkTime
          : config.runTime;
      }
      return prev - 1;
    });
  }, [currentPhase, config.walkTime, config.runTime]);

  // ---- Start / Pause / Stop ----
  const startTimer = async () => {
    setIsRunning(true);
    setIsPaused(false);
    setCurrentTimeStamp(Date.now())
    await scheduleNotificationInBatch(config);
    await setCurrentTimerState({
      ...config,
      currentPhase,
      currentRound,
      secondsRemainingInCurrentPhase: config.runTime,
    });
  };

  const pauseTimer = async() => {
    cancelAllNotifications();

    setIsRunning(false);
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    await setCurrentTimerState({
      ...config,
      rounds: config.rounds - (currentRound - 1),
      currentPhase,
      currentRound,
      secondsRemainingInCurrentPhase,
    });
  };

  const stopWorkout = () => {
    cancelAllNotifications();
    clearTimerState();
    clearTimeStamp();

    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onEndWorkout();
  };

  const resetWorkout = () => {
    cancelAllNotifications();
    clearTimerState();
    clearTimeStamp();

    setIsRunning(false);
    setIsPaused(false);
    setCurrentRound(1);
    setCurrentPhase(Phase.RUN);
    setSecondsRemainingInCurrentPhase(config.runTime);

    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // ---- Avançar quando volta do background ----
  const advanceTimer = useCallback(async (secondsPassed: number) => {
    let remaining = secondsRemainingInCurrentPhase - secondsPassed;
    let round = currentRound;
    let phase = currentPhase;


    while (remaining <= 0 && phase !== Phase.COMPLETE) {
      if (phase === Phase.RUN) {
        remaining += config.walkTime;
        phase = Phase.WALK;
      } else {
        if (round < config.rounds) {
          remaining += config.runTime;
          phase = Phase.RUN;
          round++;
        } else {
          phase = Phase.COMPLETE;
          remaining = 0;
        }
      }
    }

    setSecondsRemainingInCurrentPhase(Math.max(remaining, 0));
    setCurrentRound(round);
    setCurrentPhase(phase);

    await setCurrentTimerState({
      ...config,
      currentPhase: phase,
      currentRound: round,
      secondsRemainingInCurrentPhase: Math.max(remaining, 0),
    });
    
  }, [secondsRemainingInCurrentPhase, currentRound, currentPhase, config]);


  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextState) => {
  
      if (nextState === "inactive" || nextState === "background") {
        await setCurrentTimeStamp(Date.now());
      }
  
      if (nextState === "active" && isRunning) {
        const savedTime = await getCurrentTimeStamp();
        if (savedTime) {
          const diff = Math.floor((Date.now() - Number(savedTime)) / 1000);
          advanceTimer(diff);
          clearTimeStamp();
        }
      }
    });
  
    return () => subscription.remove();
  }, [isRunning, advanceTimer]);
  

  // ---- Tick normal (quando app aberto) ----
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, currentPhase, currentRound, tick]);

  useEffect(() => {
    if (secondsRemainingInCurrentPhase === 0 && isRunning) {
      handlePhaseTransition();
      setSecondsRemainingInCurrentPhase(currentPhase === Phase.RUN ? config.walkTime : config.runTime);
    }
  }, [secondsRemainingInCurrentPhase, isRunning, currentPhase, handlePhaseTransition, config.runTime, config.walkTime]);
  

  return {
    currentRound,
    currentPhase,
    formatTime,
    secondsRemainingInCurrentPhase,
    progress,
    isRunning,
    isPaused,
    resetWorkout,
    startTimer,
    pauseTimer,
    stopWorkout,
  };
};
