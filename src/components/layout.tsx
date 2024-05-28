import type LayoutProps from '~/interfaces/layoutProps';
import NavBar from './navbar';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className='flex flex-col h-screen'>
			<main className="flex flex-col h-full bg-white">{children}</main>
			<NavBar></NavBar>
		</div>
	);
};

export default Layout;
