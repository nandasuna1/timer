import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import IntervalConfig from '.';

describe('IntervalConfig', () => {

  it('renders correctly, updates input values and calls onStartWorkout', () => {
    const mockStart = jest.fn();
    const { getByDisplayValue, getByText } = render(
      <IntervalConfig onStartWorkout={mockStart} />
    );

    expect(getByText('Interval Runner')).toBeTruthy();
    expect(getByText('Configure your running intervals')).toBeTruthy();
    expect(getByText('Running Time')).toBeTruthy();
    expect(getByText('Walking Time')).toBeTruthy();
    expect(getByText('Number of Rounds')).toBeTruthy();
    expect(getByText('Start Workout')).toBeTruthy();

    const runMinutesInput = getByDisplayValue('1');
    fireEvent.changeText(runMinutesInput, '2');
    expect(runMinutesInput.props.value).toBe('2');

    const startButton = getByText('Start Workout');
    fireEvent.press(startButton);

    expect(mockStart).toHaveBeenCalledWith({
      runTime: 120,   // 1min * 60 + 0s
      walkTime: 30,  // 0min * 60 + 30s
      rounds: 5,
    });
  });
});
