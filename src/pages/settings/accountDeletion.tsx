import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FormEvent, useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import Layout from '~/components/layout';

const AccountDeletion: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status, router, sessionData?.user]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		if (sessionData) {
			console.log(e);
			console.log('here');
		}
	};
	if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<Layout sessionData={sessionData}>
				<div className="flex flex-col">
					<h1 className="pl-2 text-3xl font-bold text-red-600">
						Account Deletion
					</h1>
					<h2 className="text-l pl-2 font-bold">
						Deleting your account will permanently remove all of
						your data from our servers. This action cannot be
						undone.
					</h2>
					<form onSubmit={(e) => void handleSubmit(e)}>
						<div className="mat-4 grid grid-cols-1 gap-5 ">
							<div className="mat-4 grid grid-cols-1 px-2 pt-4">
								<label className="block font-bold">
									Username
								</label>
								<input
									id="firstName"
									className=" rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="Username"
								></input>
							</div>
						</div>
                        <div className="mat-4 grid grid-cols-1 gap-5 ">
							<div className="mat-4 grid grid-cols-1 px-2 pt-4">
								<label className="block font-bold">
									Password
								</label>
								<input
									id="firstName"
									className=" rounded-md bg-gray-300 px-4 py-2 text-white"
									placeholder="Password"
								></input>
							</div>
						</div>
                        <input type="submit" value="Delete Account" className="bg-red-600 text-white rounded-md px-4 py-2"></input>
					</form>
				</div>
			</Layout>
		);
	}
};

export default AccountDeletion;
