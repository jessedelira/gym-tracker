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
				<button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
					Create Workout
				</button>
				<button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
					Create Exercise
				</button>
				<button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
					Create Routine
				</button>
			</div>
		</>
	);
};

export default Create;


