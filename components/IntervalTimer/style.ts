import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1,
      backgroundColor: '#f9fafb',
      gap: 20,
    },
    roundText: {
      textAlign: 'center',
      fontSize: 16,
      marginBottom: 4,
    },
    phaseText: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    run: { color: 'green' },
    walk: { color: 'blue' },
    timerText: {
      textAlign: 'center',
      fontSize: 64,
      fontVariant: ['tabular-nums'],
      marginBottom: 16,
    },
    progress: {
      height: 10,
      borderRadius: 8,
      marginBottom: 16,
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 16,
    },
    button: {
      backgroundColor: 'black',
      borderRadius: 10,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonOutline: {
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    stopButton: {
      backgroundColor: '#da2929',
      borderColor: '#da2929',
      borderWidth: 1,
      borderRadius: 10,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonText: {
      marginLeft: 8,
      fontSize: 16,
    },
    completeText: {
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 16,
      fontWeight: 'bold',
      color: 'green',
    },
    backText: {
      fontSize: 16,
      marginBottom: 24,
    },
    pausedText: {
      textAlign: 'center',
      fontSize: 14,
      color: 'gray',
    },
    completedContainer: {
      padding: 24,
      flex: 1,
      marginTop: 20,
      gap: 20,
      textAlign: 'center',
      backgroundColor: '#f9fafb',
    },
  });
  