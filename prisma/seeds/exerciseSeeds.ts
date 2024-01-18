import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedExercises = async () => {
	const result = await prisma.exercise.findUnique({
		where: {
			name: 'Bench Press',
		},
	});

	if (result) {
		console.log('Exercises already seeded');
		return;
	} else {
		await prisma.exercise.create({
			data: {
				name: 'Bench Press',
				description:
					'The bench press is an upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Squat',
				description:
					'The squat is a compound, full-body exercise that works more than one muscle group. This powerful exercise helps tone your glutes, strengthen your body and burn a lot of calories.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Deadlift',
				description:
					'The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Overhead Press',
				description:
					'The overhead press is a compound movement that targets a number of muscles in the upper body. The overhead press is a great exercise to build strength and muscle in the shoulders, upper back, and arms.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Barbell Row',
				description:
					'The barbell row is a compound exercise that targets a number of muscles in the back, most notably the latissimus dorsi (or “lats”).',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Pull Up',
				description:
					'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands and pulls up.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Curl',
				description:
					'The dumbbell curl is a classic biceps-building exercise. Gripping a dumbbell in each hand, stand up straight with your knees slightly bent and your elbows locked at your sides.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Tricep Extension',
				description:
					'The triceps extension is an isolation exercise that targets your triceps brachii, the muscle that runs along the back of your upper arm. This exercise is commonly performed with a dumbbell, but you can also use a barbell, EZ bar, or machine.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Fly',
				description:
					'The dumbbell fly is a popular exercise for the pectoral muscles. It is performed by holding lightweight dumbbells in both hands and lying on a bench or exercise ball.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Lateral Raise',
				description:
					'The dumbbell lateral raise is a great exercise for building strength and size in your lateral deltoids, which are the muscles on the sides of your shoulders.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Front Raise',
				description:
					'The dumbbell front raise is a great exercise for building strength and size in your front deltoids, which are the muscles on the front of your shoulders.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Shoulder Press',
				description:
					'The dumbbell shoulder press is a great exercise for building strength and size in your shoulders.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Shrug',
				description:
					'The dumbbell shrug is a great exercise for building strength and size in your traps.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Squat',
				description:
					'The dumbbell squat is a great exercise for building strength and size in your legs.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Lunge',
				description:
					'The dumbbell lunge is a great exercise for building strength and size in your legs.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Deadlift',
				description:
					'The dumbbell deadlift is a great exercise for building strength and size in your legs.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Calf Raise',
				description:
					'The dumbbell calf raise is a great exercise for building strength and size in your calves.',
			},
		});

		await prisma.exercise.create({
			data: {
				name: 'Dumbbell Crunch',
				description:
					'The dumbbell crunch is a great exercise for building strength and size in your abs.',
			},
		});

		
	}
};

export default seedExercises;
