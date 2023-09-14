import { type Session } from 'next-auth';

interface NavBarProps {
	sessionData: Session | null;
}

export default NavBarProps;
