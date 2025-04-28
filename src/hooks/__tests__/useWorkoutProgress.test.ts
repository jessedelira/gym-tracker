import { renderHook, act } from '@testing-library/react';
import { useWorkoutProgress } from '../useWorkoutProgress';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useWorkoutProgress', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should update workout progress and reflect changes in state', () => {
		const workouts = [{ id: 'workout1' }, { id: 'workout2' }];

		const { result } = renderHook(() => useWorkoutProgress(workouts));

		// Initially, all workouts should be incomplete
		expect(result.current.workoutProgressMap).toEqual({
			workout1: false,
			workout2: false,
		});
		expect(result.current.isEveryWorkoutComplete).toBe(false);

		// Update the progress of the first workout
		act(() => {
			result.current.updateWorkoutProgress('workout1', true);
		});

		// Verify the state after updating
		expect(result.current.workoutProgressMap).toEqual({
			workout1: true,
			workout2: false,
		});
		expect(result.current.isEveryWorkoutComplete).toBe(false);

		// Update the progress of the second workout
		act(() => {
			result.current.updateWorkoutProgress('workout2', true);
		});

		// Verify the state after completing all workouts
		expect(result.current.workoutProgressMap).toEqual({
			workout1: true,
			workout2: true,
		});
		expect(result.current.isEveryWorkoutComplete).toBe(true);
	});
});
