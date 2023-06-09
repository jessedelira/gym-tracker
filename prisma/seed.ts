import { PrismaClient } from '@prisma/client';
import seedUsers from './seeds/users';
import seedExercises from './seeds/exercises';

const prisma = new PrismaClient();

const main = async () => {
	await seedUsers();
	await seedExercises();
	console.log('The seed was successful!');
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
