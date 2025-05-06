import { useState, useEffect, useCallback } from 'react';
import { type Workout } from '@prisma/client';

type WorkoutCompletionMap = Record<string, boolean>;

export const useWorkoutProgress = (workouts: Workout[] | undefined) => {
	const [workoutProgressMap, setWorkoutProgressMap] =
		useState<WorkoutCompletionMap>({});
	const [isEveryWorkoutComplete, setIsEveryWorkoutComplete] =
		useState<boolean>(false);

	const isValidMap = useCallback(
		(map: WorkoutCompletionMap) => {
			return (
				Object.values(map).every(Boolean) &&
				workouts?.length == Object.values(map).length
			);
		},
		[workouts],
	);

	useEffect(() => {
		if (!workouts) return;

		const workoutCompletionMap = localStorage.getItem(
			'workoutCompletionMap',
		);

		if (workoutCompletionMap) {
			const parsedMap = JSON.parse(
				workoutCompletionMap,
			) as WorkoutCompletionMap;
			if (isValidMap(parsedMap)) {
				setWorkoutProgressMap(parsedMap);
				setIsEveryWorkoutComplete(
					Object.values(parsedMap).every(Boolean),
				);
				return;
			}
		}

		const initialMap: WorkoutCompletionMap = Object.fromEntries(
			workouts.map(({ id }) => [id, false]),
		);
		localStorage.setItem(
			'workoutCompletionMap',
			JSON.stringify(initialMap),
		);
		setWorkoutProgressMap(initialMap);
		setIsEveryWorkoutComplete(false);
	}, [isValidMap, workouts]);

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
