import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type FormEvent, useEffect, useState } from 'react';
import Spinner from '~/components/Spinner';
import BaseModal from '~/components/baseModal';
import Layout from '~/components/layout';
import ProceedAccountDeletingButton from '~/components/proceedAccountDeletionButton';
import { api } from '~/utils/api';
import {
	getPasswordInputElement,
	getUsernameInputElement,
} from '~/utils/documentUtils';

const AccountDeletion: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const [proceedButtonHasBeenClicked, setProceedButtonHasBeenClicked] =
		useState(false);
	const accountDeletionMutation =
		api.accountDeletion.deleteAccount.useMutation();

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
		e.preventDefault();

		// get data from the form
		const username = getUsernameInputElement(document).value;
		const password = getPasswordInputElement(document).value;

		// call the mutation
		accountDeletionMutation.mutate({
			userId: sessionData?.user.id ?? '',
			username,
			password,
			
		}, {
			onSuccess: () => {
				// Show Modal that saying account has been deleted
				<BaseModal redirectUrl={'/'} headerMessage={'Account'} bodyMessage={''} buttonText={''}> </BaseModal>

				// Remove the session

				// Redirect to the 
			}
		});

	};

	const handleProceedButtonClick = () => {
		setProceedButtonHasBeenClicked(true);
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
					<h2 className="text-l pb-5 pl-2 font-bold">
						Deleting your account will permanently remove all of
						your data from our servers. This action cannot be
						undone.
					</h2>
					{proceedButtonHasBeenClicked ? (
						<form onSubmit={(e) => void handleSubmit(e)}>
							<div className="mat-4 grid grid-cols-1 gap-5 ">
								<div className="mat-4 grid grid-cols-1 px-2 pt-4">
									<label className="block font-bold">
										Username
									</label>
									<input
										id="username"
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
										id="password"
										className=" rounded-md bg-gray-300 px-4 py-2 text-white"
										placeholder="Password"
									></input>
								</div>
							</div>
							<div className="mt-4 flex justify-center">
								<input
									type="submit"
									value="Delete Account"
									className="rounded-md bg-red-600 px-4 py-2 text-white"
								></input>
							</div>
						</form>
					) : (
						<ProceedAccountDeletingButton
							onClick={handleProceedButtonClick}
						/>
					)}
				</div>
			</Layout>
		);
	}
};

export default AccountDeletion;
