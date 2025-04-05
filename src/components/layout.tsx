import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden">
			<main className="pt-safe mb-16 flex-1 overflow-y-auto bg-gray-50 pb-4 pt-12">
				{children}
			</main>
			<NavBar />
		</div>
	);
};

export default Layout;
