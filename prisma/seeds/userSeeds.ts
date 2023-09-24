import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedUsers = async () => {
	const result = await prisma.user.findUnique({
		where: {
			username: 'superuser',
		},
	});

	if (result) {
		console.log('Users already seeded');
		return;
	} else {
		await prisma.user.create({
			data: {
				username: 'superuser',
				password:
					'$2b$10$00KSEDAm4EqdfS94ukk9e.uuiPxUdR8Si.sbSGHCFzZ4qkNcw2M3e',
				firstName: 'super',
				lastName: 'user',
			},
		});
	}
};

export default seedUsers;
