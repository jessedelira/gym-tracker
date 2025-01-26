import { useEffect, useState } from 'react';

interface DayActivity {
	date: Date;
	status: 'complete' | 'partial' | 'missed';
	sessionsCompleted: number;
	totalSessions: number;
}

const SESSIONS_PER_DAY = 3; // Assuming 3 sessions should be completed each day

const ActivityGraph: React.FC = () => {
	const [activityData, setActivityData] = useState<DayActivity[]>([]);

	useEffect(() => {
		const getMockSessionData = () => {
			// Mock completion patterns
			const patterns = [
				{ chance: 0.7, sessions: 3 }, // 70% chance of completing all sessions
				{ chance: 0.2, sessions: 2 }, // 20% chance of completing 2 sessions
				{ chance: 0.1, sessions: 1 }, // 10% chance of completing 1 session
			];

			const getSessionsForDay = () => {
				const random = Math.random();
				let cumulative = 0;

				for (const pattern of patterns) {
					cumulative += pattern.chance;
					if (random <= cumulative) {
						return pattern.sessions;
					}
				}
				return 0;
			};

			const days: DayActivity[] = [];
			const today = new Date();

			for (let i = 29; i >= 0; i--) {
				const date = new Date(today);
				date.setDate(today.getDate() - i);

				const sessionsCompleted = getSessionsForDay();

				// Determine status based on sessions completed
				const status =
					sessionsCompleted === SESSIONS_PER_DAY
						? 'complete'
						: sessionsCompleted > 0
						? 'partial'
						: 'missed';

				days.push({
					date,
					status,
					sessionsCompleted,
					totalSessions: SESSIONS_PER_DAY,
				});
			}
			return days;
		};

		setActivityData(getMockSessionData());
	}, []);

	const getStatusColor = (status: DayActivity['status']) => {
		switch (status) {
			case 'complete':
				return 'bg-green-500';
			case 'partial':
				return 'bg-yellow-500';
			case 'missed':
				return 'bg-red-500';
			default:
				return 'bg-gray-200';
		}
	};

	return (
		<div className=" flex flex-col items-center justify-center gap-2  sm:p-10">
			<h1 className="mb-2 text-xl font-medium">Activity Graph</h1>
			<div className="grid grid-cols-7 gap-2">
				{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
					<div
						key={i}
						className="flex h-8 w-9 items-center justify-center rounded-md bg-gray-100 font-medium text-gray-500"
					>
						{day}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-2">
				{activityData.map((day, i) => (
					<div
						key={i}
						className={`h-8 w-9 rounded-md ${getStatusColor(
							day.status,
						)}`}
						title={`${day.date.toLocaleDateString()}: ${
							day.sessionsCompleted
						}/${day.totalSessions} sessions`}
					/>
				))}
			</div>
			<div className="mt-4 flex gap-4 text-sm text-gray-600">
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded-sm bg-green-500" />
					<span>All Sessions</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded-sm bg-yellow-500" />
					<span>Partial</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded-sm bg-red-500" />
					<span>Missed</span>
				</div>
			</div>
		</div>
	);
};

export default ActivityGraph;
