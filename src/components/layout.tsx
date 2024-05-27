import type LayoutProps from '~/interfaces/layoutProps';
import NavBar from './navbar';

const Layout: React.FC<LayoutProps> = ({ sessionData, children }) => {
	return (
		<div className='flex flex-col h-screen'>
			<main className="flex flex-col h-full bg-white border-red-600 border-2">{children}</main>
			<NavBar sessionData={sessionData ? sessionData : null}></NavBar>
		</div>
	);
};

export default Layout;
