import { useSession } from 'next-auth/react';
import AuthDisplay from '~/components/authDisplay';
import ClockIcon from './icons/clockIcon';

const HomePage: React.FC = () => {
	const { data: sessionData, status } = useSession();
	return (
		<>
			<main className=" flex min-h-screen min-w-full flex-col items-center bg-white">
				<section className="min-w-full">
					<div className="grid grid-cols-2">
						<div className="mt-[20%] p-10 pl-[54%] text-center">
							<h1 className="mb-5 text-5xl text-black">
								Gym Tracker
							</h1>
							<div className="mb-5">
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit. Sed ultricies porta nisl.
								</p>
							</div>

							<AuthDisplay
								sessionData={sessionData}
							></AuthDisplay>
						</div>
						<div className="relative  min-h-[650px] rounded-s-full bg-[url('https://images.pexels.com/photos/4164772/pexels-photo-4164772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] p-10"></div>
					</div>
				</section>
				<section>
					<div className="min-w-full">
						<div className=" mb-8 grid text-center">
							<h3 className="mb-3 font-bold text-red-500">
								Our Services
							</h3>
							<h1 className=" text-3xl">
								Lorem ipsum dolor sit amet, consectetur
							</h1>
						</div>
						<div className="grid grid-cols-3 gap-12">
							<div className="group/item max-h-[200px] border-2 border-white bg-gray-100 p-8 text-center font-medium hover:cursor-pointer hover:border-gray-100 hover:bg-white">
								<div className=" mb-3 object-none object-center">
									<img
										className="ml-[auto] mr-[auto] h-[80px]"
										src="./icons/run.png"
									/>
								</div>
								<p className="mb-2">Manage Routines</p>

								<a
									className="group/edit text-s invisible text-center text-red-500 group-hover/item:visible"
									href="#"
								>
									<span className=" group-hover/edit:text-red-500">
										Learn More
									</span>
								</a>
							</div>
							<div className="group/item max-h-[200px] border-2 border-white bg-gray-100 p-8 text-center font-medium hover:cursor-pointer hover:border-gray-100 hover:bg-white">
								<div className=" mb-3 object-none object-center">
									<img
										className="ml-[auto] mr-[auto] h-[80px]"
										src="./icons/list.png"
									/>
								</div>
								<p className="mb-2">Manage Sessions</p>

								<a
									className="group/edit text-s invisible text-center text-red-500 group-hover/item:visible"
									href="#"
								>
									<span className=" group-hover/edit:text-red-500">
										Learn More
									</span>
								</a>
							</div>
							<div className="group/item max-h-[200px] border-2 border-white bg-gray-100 p-8 text-center font-medium hover:cursor-pointer hover:border-gray-100 hover:bg-white">
								<div className=" mb-3 object-none object-center">
									<img
										className="ml-[auto] mr-[auto] h-[80px]"
										src="./icons/run.png"
									/>
								</div>
								<p className="mb-2">Active Routines</p>

								<a
									className="group/edit text-s invisible text-center text-red-500 group-hover/item:visible"
									href="#"
								>
									<span className=" group-hover/edit:text-red-500">
										Learn More
									</span>
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default HomePage;
