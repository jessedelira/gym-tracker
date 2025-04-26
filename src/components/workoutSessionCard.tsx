import { type Session } from '@prisma/client';

interface WorkoutSessionCardProps {
	session: Session;
	listOfCompletedSessionIds?: string[];
	onStartSession: (sessionId: string) => void;
}

const WorkoutSessionCard: React.FC<WorkoutSessionCardProps> = ({
	session,
	listOfCompletedSessionIds,
	onStartSession,
}) => {
	const handleClick = () => {
		void onStartSession(session.id);
	};

	return (
		<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
			<div className="mb-2">
				<h2 className="text-lg font-medium text-gray-900">
					{session.name}
				</h2>
				{session.description && (
					<p className="mt-1 text-sm text-gray-500">
						{session.description}
					</p>
				)}
			</div>
			<button
				onClick={handleClick}
				disabled={listOfCompletedSessionIds?.includes(session.id)}
				className={`mt-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium ${
					listOfCompletedSessionIds?.includes(session.id)
						? 'bg-gray-100 text-gray-400'
						: 'bg-blue-600 text-white hover:bg-blue-700'
				}`}
			>
				{listOfCompletedSessionIds?.includes(session.id)
					? 'Completed'
					: 'Start Session'}
			</button>
		</div>
	);
};

export default WorkoutSessionCard;
