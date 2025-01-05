import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white">
			<main className="flex-1 overflow-y-auto">{children}</main>
			<nav className="fixed bottom-0 left-0 right-0 flex h-[4.5rem] items-center justify-around border-t bg-white pb-[env(safe-area-inset-bottom)]">
				<NavBar />
			</nav>
		</div>
	);
};

export default Layout;
