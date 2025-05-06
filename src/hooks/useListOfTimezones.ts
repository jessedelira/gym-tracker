import { api } from '~/utils/api';

export const useFetchListOfTimezones = () => {
	const { data } = api.timezoneMap.getListOfTimezones.useQuery();
	return data;
};
