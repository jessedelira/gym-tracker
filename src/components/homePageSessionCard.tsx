interface HomePageSessionCardProps {
	sessionName: string;
	sessionDescription: string;
	handleStartButtonClick?: () => Promise<void>;
	isCompleted: boolean;
}

const HomePageSessionCard: React.FC<HomePageSessionCardProps> = ({
	sessionName,
	sessionDescription,
	handleStartButtonClick,
	isCompleted,
}) => {
	return (
		<section className="bg-muted w-full py-5 md:py-24 lg:py-32">
			<div className="container grid grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-6">
				<div className="min-w-80 overflow-hidden rounded-lg border-2">
					<div className="p-4">
						<h3 className="text-xl font-bold">{sessionName}</h3>
						<p className="text-muted-foreground">
							{sessionDescription}
						</p>
						<div className="mt-4">
							{isCompleted ? (
								<button
									onClick={handleStartButtonClick}
									className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md bg-blue-300 px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
									disabled
								>
									Completed 🎉
								</button>
							) : (
								<button
									onClick={handleStartButtonClick}
									className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-9 items-center justify-center rounded-md bg-blue-400 px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
								>
									Start
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomePageSessionCard;
