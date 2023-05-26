import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedUsers = async () => {
	await prisma.user.upsert({
		where: { email: 'super@user.com' },
		update: {},
		create: {
			username: 'superuser',
			password:
				'$2b$10$00KSEDAm4EqdfS94ukk9e.uuiPxUdR8Si.sbSGHCFzZ4qkNcw2M3e',
			firstName: 'super',
			lastName: 'user',
			email: 'super@user.com',
			image: 'https://robohash.org/superuser',
		},
	});

	await prisma.user.upsert({
		where: { email: 'jesse@test.com' },
		update: {},
		create: {
			username: 'jesse',
			password:
				'$2b$10$00KSEDAm4EqdfS94ukk9e.uuiPxUdR8Si.sbSGHCFzZ4qkNcw2M3e',
			firstName: 'Jesse',
			lastName: 'Test',
			email: 'jesse@test.com',
			image: 'https://robohash.org/jesse',
		},
	});
};

export default seedUsers;
