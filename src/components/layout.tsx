import type LayoutProps from '~/interfaces/layoutProps';
import NavBar from './navbar';

const Layout: React.FC<LayoutProps> = ({ sessionData, children }) => {
	return (
		<div className="flex h-screen flex-col">
			<main className="flex h-svh flex-col bg-white">{children}</main>
			<NavBar sessionData={sessionData ? sessionData : null}></NavBar>
		</div>
	);
};

export default Layout;
