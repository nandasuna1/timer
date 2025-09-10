import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ISettingsContext {
    toggleNotifications: () => void;
    notificationsEnabled: boolean;
    soundEnabled: boolean;
    toggleSound: () => void;
}

export const SettingsContext = createContext({} as ISettingsContext);

export function SettingsProvider({ children }: PropsWithChildren) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    }

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
    }

    const value = {
        toggleNotifications,
        notificationsEnabled,
        soundEnabled,
        toggleSound
    }
  
    return (
      <SettingsContext.Provider value={value}>
        {children}
      </SettingsContext.Provider>
    );
}

export function useSettingsContext() {
    return useContext(SettingsContext);
}