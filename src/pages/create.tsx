import { type NextPage } from 'next';
import NavBar from '~/components/navbar';
import { useSession } from 'next-auth/react';

const Create: NextPage = () => {
	const { data: sessionData, status } = useSession();

	return (
		// create three buttons: create workout, create exercise, create routine with tailwind css
		<>
			<NavBar sessionData={sessionData}></NavBar>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">Create</h1>
				{/* create buttons that match the rest of the buttons of white and black and grey with routines, sessions, workouts */}
				<button className="mt-4 rounded-md bg-black px-4 py-2 text-white">
					Create Workout
				</button>
				<button className="mt-4 rounded-md bg-black px-4 py-2 text-white">
					Create Exercise
				</button>
				<button className="mt-4 rounded-md bg-black px-4 py-2 text-white">
					Create Routine
				</button>
			</div>
		</>
	);
};

export default Create;
