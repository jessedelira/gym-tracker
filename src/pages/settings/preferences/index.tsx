import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '~/components/layout';
import Spinner from '~/components/Spinner';
import { api } from '~/utils/api';

const Preferences: NextPage = () => {
	const { data: sessionData, status, update } = useSession();
	const router = useRouter();

	const { mutateAsync: enablePreferenceByIdAsync } =
		api.preference.enablePreferenceById.useMutation();

	const { mutateAsync: disablePreferenceByIdAsync } =
		api.preference.disablePreferenceById.useMutation();

	const handlePreferenceToggle = async (
		event: React.MouseEvent<HTMLInputElement, MouseEvent>,
	) => {
		if (sessionData && sessionData.user.userPreferences) {
			const preferenceEnumValue = (event.target as HTMLInputElement).id;
			const isNowChecked = (event.target as HTMLInputElement).checked;

			const preference = sessionData.user.userPreferences.find(
				(preference) => preference.preference === preferenceEnumValue,
			);

			if (isNowChecked && preference) {
				await enablePreferenceByIdAsync({
					id: preference.id,
				});
			} else {
				if (preference) {
					await disablePreferenceByIdAsync({
						id: preference.id,
					});
				}
				(event.target as HTMLInputElement).removeAttribute('checked');
			}

			await update({});
		}
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}

		sessionData?.user.userPreferences?.forEach((preference) => {
			if (preference.enabled) {
				const checkbox = document.getElementById(preference.preference);

				if (checkbox) {
					checkbox.setAttribute('checked', 'true');
				}
			}
		});
	}, [status, router, sessionData]);

	if (!sessionData && status === 'loading') {
		return <Spinner />;
	}

	return (
		<Layout>
			<div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold tracking-tight">
						Preferences
					</h1>
					<p className="text-muted-foreground mt-2">
						Customize your experience by toggling features on or
						off.
					</p>
				</div>
				<div className="grid gap-6">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-medium">
								Confetti Mode
							</h3>
							<p className="text-muted-foreground">
								Enable confetti animation when you complete a
								session.
							</p>
						</div>

						<div className="inline-flex items-center">
							<div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
								<input
									id="CONFETTI_ON_SESSION_COMPLETION"
									type="checkbox"
									className="bg-blue-gray-100 peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full border border-black transition-colors duration-300 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
									onClick={(e) => {
										void handlePreferenceToggle(e);
									}}
								/>
								<label
									htmlFor="CONFETTI_ON_SESSION_COMPLETION"
									className="before:content[''] border-blue-gray-100 before:bg-blue-gray-500 absolute -left-1 top-2/4 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
								>
									<div
										className="left-2/4 top-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										data-ripple-dark="true"
									></div>
								</label>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-medium">
								Show Elapsed Seconds in Active Session
							</h3>
							<p className="text-muted-foreground">
								Show the elapsed seconds in the active session.
							</p>
						</div>

						<div className="inline-flex items-center">
							<div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
								<input
									id="SHOW_ELAPSED_SECONDS_IN_ACTIVE_SESSION"
									type="checkbox"
									className="bg-blue-gray-100 peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full border border-black transition-colors duration-300 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
									onClick={(e) => {
										void handlePreferenceToggle(e);
									}}
								/>
								<label
									htmlFor="SHOW_ELAPSED_SECONDS_IN_ACTIVE_SESSION"
									className="before:content[''] border-blue-gray-100 before:bg-blue-gray-500 absolute -left-1 top-2/4 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
								>
									<div
										className="left-2/4 top-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
										data-ripple-dark="true"
									></div>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Preferences;
