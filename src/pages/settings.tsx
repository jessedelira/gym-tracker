import { User } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '~/components/navbar';

const Settings: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const [userDto,setUserDto] = useState<User>();
	const [dataChangeInForm, setDataChangeInForm] = useState(false);
	const router = useRouter();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDataChangeInForm(true);
	}

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status, router]);

	if (isLoading) {
		return <></>;
	} else {
		return (
			<>
				<NavBar sessionData={sessionData}></NavBar>
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">Account Settings</h1>

					<input
						className="mt-4 rounded-md bg-black px-4 py-2 text-white"
						placeholder="First Name"
						defaultValue={sessionData?.user.firstName ?? 'Loading...'}
						onChange={handleInputChange}
					></input>
					<input
						className="mt-4 rounded-md bg-black px-4 py-2 text-white"
						placeholder="Last Name"
						defaultValue={sessionData?.user.lastName ?? 'Loading...'}
						onChange={handleInputChange}
					></input>
					<input
						className="mt-4 rounded-md bg-black px-4 py-2 text-white"
						placeholder="Username"
						defaultValue={sessionData?.user.username ?? 'Loading...'}
						onChange={handleInputChange}
					></input>
					<input
						className="mt-4 rounded-md bg-black px-4 py-2 text-white"
						placeholder="Password"
					></input>
					{dataChangeInForm ? (
						<div className="mt-4 grid grid-col-2 gap-1">
							<button className="rounded-md bg-black px-4 py-2 text-white">Save</button>
							<button className="rounded-md bg-black px-4 py-2 text-white">Cancel</button>
						</div>

					) : null}

				</div>
			</>
		);
	}
};

export default Settings;
