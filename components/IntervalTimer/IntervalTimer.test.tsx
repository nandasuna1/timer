// // __tests__/IntervalTimer.test.tsx
// import { act, fireEvent, render } from '@testing-library/react-native';
// import React from 'react';
// import { IntervalTimer } from '.';

// // Mock das notificações e vibração
// jest.mock('expo-notifications');
// jest.mock('react-native/Libraries/Vibration/Vibration', () => ({
//   vibrate: jest.fn(),
// }));
// jest.mock('.', () => {
//     const originalModule = jest.requireActual('.');
  
//     return {
//       ...originalModule,
//       registerForPushNotificationsAsync: jest.fn().mockResolvedValue('test-token'),
//     };
//   });
  
// jest.useFakeTimers();

// const config = {
//   runTime: 2, // segundos para teste rápido
//   walkTime: 1,
//   rounds: 2,
// };

// describe('IntervalTimer', () => {
//   it('renders correctly', async () => {
//       await act(async () => {
//         render(
//           <IntervalTimer
//             config={{ runTime: 1, walkTime: 1, rounds: 1 }}
//             onEndWorkout={jest.fn()}
//             onBackToConfig={jest.fn()}
//           />
//         );
//       });
//     });

//   it('starts, pauses and resets the timer', () => {
//     const { getByText, getByRole } = render(
//       <IntervalTimer
//         config={config}
//         onEndWorkout={jest.fn()}
//         onBackToConfig={jest.fn()}
//       />
//     );

//     const playButton = getByRole('button', { name: /play-outline/i });
//     const resetButton = getByRole('button', { name: /refresh/i });

//     // Start
//     act(() => {
//       fireEvent.press(playButton);
//       jest.advanceTimersByTime(1000); // 1s
//     });

//     expect(getByText('1:01')).toBeTruthy(); // ou similar dependendo da renderização

//     // Pause
//     act(() => {
//       fireEvent.press(playButton);
//     });
//     expect(getByText('Workout Paused')).toBeTruthy();

//     // Reset
//     act(() => {
//       fireEvent.press(resetButton);
//     });
//     expect(getByText('Round 1 of 2')).toBeTruthy();
//     expect(getByText('RUN!')).toBeTruthy();
//   });

//   it('completes the workout', () => {
//     const onEndWorkout = jest.fn();

//     const { getByText } = render(
//       <IntervalTimer
//         config={{ ...config, runTime: 1, walkTime: 1, rounds: 1 }}
//         onEndWorkout={onEndWorkout}
//         onBackToConfig={jest.fn()}
//       />
//     );

//     act(() => {
//       jest.advanceTimersByTime(2000); // run + walk
//     });

//     expect(getByText('Workout Complete!')).toBeTruthy();
//     // Não chama onEndWorkout ainda, só quando para manualmente
//   });
// });
