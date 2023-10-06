import { PrismaClient } from '@prisma/client';
import seedUsers from './seeds/userSeeds';
import seedExercises from './seeds/exerciseSeeds';

const prisma = new PrismaClient();

const main = async () => {
	await seedUsers();
	await seedExercises();
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
