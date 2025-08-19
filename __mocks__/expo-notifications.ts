// __mocks__/expo-notifications.ts
export const setNotificationHandler = jest.fn();

export const getNotificationChannelsAsync = jest.fn().mockResolvedValue([]);

export const addNotificationReceivedListener = jest
  .fn()
  .mockReturnValue({ remove: jest.fn() });

export const addNotificationResponseReceivedListener = jest
  .fn()
  .mockReturnValue({ remove: jest.fn() });

export const scheduleNotificationAsync = jest.fn();

export const setNotificationChannelAsync = jest.fn();

export const getPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' });
export const requestPermissionsAsync = jest.fn().mockResolvedValue({ status: 'granted' });
export const getExpoPushTokenAsync = jest.fn().mockResolvedValue({ data: 'token' });
