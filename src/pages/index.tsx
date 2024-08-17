import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HomePage from '~/components/homePage';
import Spinner from '~/components/Spinner';

const Home: NextPage = () => {
	const { data: sessionData, status } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			setIsLoading(false); // if you router.push('/') here, it will cause an infinite loop
		} else if (status === 'loading') {
			setIsLoading(true);
		} else {
			void router.push('/home');
		}
	}, [status, router]);

	if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<>
				<main className="mt-[10%] flex min-h-screen min-w-full flex-col items-center bg-white">
					<section className="min-w-full">
						<div className="grid grid-cols-2">
							<div className="p-10 text-right">
								<h1 className="mb-5 text-5xl text-black">
									Gym Tracker
								</h1>
								<AuthDisplay
									sessionData={sessionData}
								></AuthDisplay>
							</div>
							<div className="min-h-8 p-10">
								<div className=" max-w-[50%] bg-gray-100 px-5">
									<p className="pb-8 pt-4">
										Lorem ipsum dolor sit amet, consectetur
										adipiscing elit. Sed ultricies porta
										nisl. Etiam porta porta lacus, sodales
										mollis turpis pellentesque ut. Phasellus
										urna lectus, sodales non nisi at,
										viverra volutpat velit. In quis dapibus
										tortor. Phasellus eget consectetur orci.
										Integer volutpat ac enim ac sodales.
										Quisque in lorem laoreet, viverra augue
										consectetur, porta mauris. Donec ut
										tincidunt turpis. Sed pellentesque
										lectus scelerisque dolor fringilla, ac
										sagittis velit laoreet.
									</p>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div className="min-w-full">
							<div className="mb-8 grid">
								<h1 className="text-center text-3xl">
									You can track
								</h1>
							</div>
							<div className="grid grid-cols-3 gap-12">
								<div className="bg-gray-200 p-8">
									Manage Routines
								</div>
								<div className="bg-gray-200 p-8">
									Manage Sessions
								</div>
								<div className="bg-gray-200 p-8">
									Active Routines
								</div>
							</div>
						</div>
					</section>
				</main>
			</>
		);
	}
};

export default Home;
