import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      padding: 20,
      gap: 20,
      backgroundColor: '#f9fafb',
      flexGrow: 1,
    },
    header: {
      alignItems: 'center',
      gap: 4,
    },
    headerTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    subtitle: {
      color: '#6b7280',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    inputRow: {
      flexDirection: 'row',
      gap: 12,
    },
    inputGroup: {
      flex: 1,
      gap: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: '#d1d5db',
      borderRadius: 8,
      padding: 10,
      textAlign: 'center',
      backgroundColor: '#fff',
    },
    timerPreview: {
      marginTop: 12,
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'monospace',
      backgroundColor: '#f3f4f6',
      padding: 10,
      borderRadius: 8,
    },
    summary: {
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      padding: 16,
      borderRadius: 8,
    },
    totalTime: {
      fontSize: 22,
      fontFamily: 'monospace',
      marginTop: 4,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: '#000',
      padding: 16,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  });