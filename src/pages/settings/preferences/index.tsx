import { Preference } from '@prisma/client';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '~/components/layout';
import PreferenceToggle, {
	type PreferenceOption,
} from '~/components/perferenceToggle';
import Spinner from '~/components/Spinner';
import { api } from '~/utils/api';

const preferenceOptions: PreferenceOption[] = [
	{
		id: Preference.CONFETTI_ON_SESSION_COMPLETION,
		title: 'Confetti Mode',
		description: 'Enable confetti animation when you complete a session.',
	},
	{
		id: Preference.SHOW_ELAPSED_SECONDS_IN_ACTIVE_SESSION,
		title: 'Show Elapsed Seconds in Active Session',
		description: 'Show the elapsed seconds in the active session.',
	},
];

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
		if (!sessionData?.user.userPreferences) return;

		const target = event.target as HTMLInputElement;
		const preferenceEnumValue = target.id;
		const isNowChecked = target.checked;

		const preference = sessionData.user.userPreferences.find(
			(pref) => pref.preference === preferenceEnumValue,
		);

		if (!preference) return;

		if (isNowChecked) {
			await enablePreferenceByIdAsync({ id: preference.id });
		} else {
			await disablePreferenceByIdAsync({ id: preference.id });
			target.removeAttribute('checked');
		}

		await update();
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			void router.push('/');
		}
	}, [status, router]);

	if (!sessionData && status === 'loading') {
		return <Spinner />;
	}

	return (
		<Layout>
			<div className="container mx-auto px-4 md:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-2xl font-semibold text-gray-900">
						Preferences
					</h1>
					<p className="mt-2 text-gray-600">
						Customize your experience by toggling features on or off
					</p>
				</div>

				{/* Preferences List */}
				<div className="space-y-4">
					{preferenceOptions.map((option) => (
						<div
							key={option.id}
							className="rounded-2xl bg-white p-6 shadow-sm"
						>
							<div className="flex items-center justify-between">
								<PreferenceToggle
									option={option}
									onToggle={(e) =>
										void handlePreferenceToggle(e)
									}
									isEnabled={
										sessionData?.user.userPreferences?.find(
											(pref) =>
												pref.preference === option.id,
										)?.enabled ?? false
									}
								/>
							</div>
						</div>
					))}
				</div>

				{/* Additional Settings */}
				<div className="mt-8">
					<h2 className="mb-4 text-xl font-semibold text-gray-900">
						Additional Settings
					</h2>
					<div className="rounded-2xl bg-blue-50/50 p-6">
						<p className="text-blue-600">
							More customization options coming soon. Stay tuned!
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Preferences;
