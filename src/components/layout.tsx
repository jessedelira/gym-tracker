import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden">
			<main className="flex-1 overflow-y-auto bg-gray-50 pt-12">
				{children}
			</main>
			<nav className="relative z-50 bg-white">
				<NavBar />
			</nav>
		</div>
	);
};

export default Layout;
