import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden">
			<main className="flex-1 overflow-y-auto bg-gray-50 ">
				{children}
			</main>
			<nav>
				<NavBar />
			</nav>
		</div>
	);
};

export default Layout;
