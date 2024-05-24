import seedUsers from './seeds/userSeeds';
import seedExercises from './seeds/exerciseSeeds';


const main = async () => {
	await seedUsers();
	await seedExercises();
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	});
