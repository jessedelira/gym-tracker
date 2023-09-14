import type { GetServerSidePropsContext } from 'next';
import { getCsrfToken } from 'next-auth/react';

const getServerSideProps = async (context: GetServerSidePropsContext) => {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
};

export default getServerSideProps;
