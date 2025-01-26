import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white">
			<main className="mb-20 flex-1 overflow-y-auto pt-14">
				{children}
			</main>
			<NavBar />
		</div>
	);
};

export default Layout;
