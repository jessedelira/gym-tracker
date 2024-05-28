import NavBar from './navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-screen flex-col">
			<main className="flex h-full flex-col bg-white">{children}</main>
			<NavBar></NavBar>
		</div>
	);
};

export default Layout;
