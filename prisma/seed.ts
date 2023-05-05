import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
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

	console.log('The seed was successful!');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
