export const formatTime = (minutes: number, seconds: number) =>
    `${minutes}:${seconds.toString().padStart(2, '0')}`;