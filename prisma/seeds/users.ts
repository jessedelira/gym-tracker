import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedUsers = async () => {
	await prisma.user.create({
		data: {
			id: '123',
			username: 'superuser',
			password:
				'$2b$10$00KSEDAm4EqdfS94ukk9e.uuiPxUdR8Si.sbSGHCFzZ4qkNcw2M3e',
			firstName: 'super',
			lastName: 'user',
		},
	});
};

export default seedUsers;
