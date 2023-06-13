import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// This will server a a component that will hold all of the information of a user/user profile page and will be used to display the user's information
const Test: React.FC = () => {
    return (
        <div>
            <h1>Test</h1>
        </div>
    );
}

export default Test;