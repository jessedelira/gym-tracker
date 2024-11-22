import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-screen flex-col">
			<main className="h-[10%] flex-grow bg-white">{children}</main>
			<nav className="flex h-[10%] justify-between bg-black">
				<NavBar />
			</nav>
		</div>
	);
};

export default Layout;
