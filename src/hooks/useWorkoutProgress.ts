import { useState, useEffect, useCallback } from 'react';

type WorkoutCompletionMap = Record<string, boolean>;

type Workout = { id: string };

export const useWorkoutProgress = (workouts: Workout[] | undefined) => {
	const [workoutProgressMap, setWorkoutProgressMap] =
		useState<WorkoutCompletionMap>({});
	const [isEveryWorkoutComplete, setIsEveryWorkoutComplete] = useState(false);

	// Validate the parsed data
	const isValidMap = useCallback(
		(map: Record<string, unknown>): map is WorkoutCompletionMap => {
			return Object.values(map).every(
				(value) => typeof value === 'boolean',
			);
		},
		[],
	);

	// Load from localStorage when workouts change
	useEffect(() => {
		if (!workouts) return;

		const workoutCompletionMap = localStorage.getItem(
			'workoutCompletionMap',
		);

		if (!workoutCompletionMap) {
			const initialMap: WorkoutCompletionMap = Object.fromEntries(
				workouts.map(({ id }) => [id, false]),
			);
			localStorage.setItem(
				'workoutCompletionMap',
				JSON.stringify(initialMap),
			);
			setWorkoutProgressMap(initialMap);
			setIsEveryWorkoutComplete(false); // Ensure initial state is correct
		} else {
			try {
				const parsedMap = JSON.parse(workoutCompletionMap) as Record<
					string,
					unknown
				>;

				if (isValidMap(parsedMap)) {
					setWorkoutProgressMap(parsedMap);
					setIsEveryWorkoutComplete(
						Object.values(parsedMap).every(Boolean),
					);
				} else {
					// If invalid data, reset to initial state
					const initialMap: WorkoutCompletionMap = Object.fromEntries(
						workouts.map(({ id }) => [id, false]),
					);
					localStorage.setItem(
						'workoutCompletionMap',
						JSON.stringify(initialMap),
					);
					setWorkoutProgressMap(initialMap);
					setIsEveryWorkoutComplete(false); // Ensure initial state is correct
				}
			} catch (error) {
				// Handle JSON parsing error
				console.error(
					'Error parsing workoutCompletionMap from localStorage:',
					error,
				);
				const initialMap: WorkoutCompletionMap = Object.fromEntries(
					workouts.map(({ id }) => [id, false]),
				);
				localStorage.setItem(
					'workoutCompletionMap',
					JSON.stringify(initialMap),
				);
				setWorkoutProgressMap(initialMap);
				setIsEveryWorkoutComplete(false); // Ensure initial state is correct
			}
		}
	}, [workouts, isValidMap]);

	// Update workout progress
	const updateWorkoutProgress = useCallback(
		(workoutId: string, isComplete: boolean) => {
			setWorkoutProgressMap((prevMap) => {
				const updatedWorkouts = {
					...prevMap,
					[workoutId]: isComplete,
				};
				localStorage.setItem(
					'workoutCompletionMap',
					JSON.stringify(updatedWorkouts),
				);
				const allComplete =
					Object.values(updatedWorkouts).every(Boolean);
				setIsEveryWorkoutComplete(allComplete);
				return updatedWorkouts; // Return the updated state
			});
		},
		[],
	);

	// Reset workout progress
	const resetWorkoutProgress = useCallback(() => {
		localStorage.removeItem('workoutCompletionMap');
		setWorkoutProgressMap({});
		setIsEveryWorkoutComplete(false);
	}, []);

	return {
		workoutProgressMap,
		isEveryWorkoutComplete,
		updateWorkoutProgress,
		resetWorkoutProgress,
	};
};
