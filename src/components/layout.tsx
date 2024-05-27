import type LayoutProps from '~/interfaces/layoutProps';
import NavBar from './navbar';

const Layout: React.FC<LayoutProps> = ({ sessionData, children }) => {
	return (
		<div>
			<main className="flex flex-col h-192 bg-white">{children}</main>
			<NavBar sessionData={sessionData ? sessionData : null}></NavBar>
		</div>
	);
};

export default Layout;
