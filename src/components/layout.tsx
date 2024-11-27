import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-screen flex-col">
			<main className="h-[90%] flex-grow bg-white">{children}</main>
			<nav className="border-gray-200-400 flex h-[10%] justify-center gap-9 border-t bg-white">
				<NavBar />
			</nav>
		</div>
	);
};

export default Layout;
