import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white">
			<main className="flex-1 overflow-y-auto mt-4 pb-20">{children}</main>
			<NavBar />
		</div>
	);
};

export default Layout;
