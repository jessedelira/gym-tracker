import type LayoutProps from '~/interfaces/layoutProps';
import NavBar from './navbar';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex h-screen flex-col">
			<main className="flex h-full flex-col bg-white">{children}</main>
			<NavBar></NavBar>
		</div>
	);
};

export default Layout;
