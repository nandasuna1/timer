import { createContext, PropsWithChildren, useContext, useState } from "react";

interface ISettingsContext {
    toggleNotifications: () => void;
    notificationsEnabled: boolean;
}

export const SettingsContext = createContext({} as ISettingsContext);

export function SettingsProvider({ children }: PropsWithChildren) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    }

    const value = {
        toggleNotifications,
        notificationsEnabled
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