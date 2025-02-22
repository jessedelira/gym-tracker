import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { prisma } from '~/server/db';

export const timezoneMapRouter = createTRPCRouter({
	getListOfTimezones: publicProcedure.query(async () => {
		const timezoneMap = await prisma.timezoneMap.findMany();
		return timezoneMap;
	}),
});
