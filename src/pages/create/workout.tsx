import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


const Workout: NextPage = () => {
    const {data: sessionData, status } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            void router.push('/');
        } else if (status === 'loading') {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [status, router]);

    if (isLoading) {
        return <></>;
    } else {
        return (
            <>
                <h1>Create Workout Page</h1>
            </>
        )
    }
}

export default Workout;