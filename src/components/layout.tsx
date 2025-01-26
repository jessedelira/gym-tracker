import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white">
			<main className="flex-1 overflow-y-auto pb-24">{children}</main>
			<NavBar />
		</div>
	);
};

export default Layout;
