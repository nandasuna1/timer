import { useAudioPlayer } from "expo-audio";

const defaultAudioSource = require('../assets/sounds/alarm.mp3')
export const useSound = (audioSource = defaultAudioSource) =>  {
    const player = useAudioPlayer(audioSource)

    return {
        play: () => player.play(),
        pause: () => player.pause(),
    }
}