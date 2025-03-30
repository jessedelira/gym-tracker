import { ExerciseType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedExercises = async () => {
	// Wipe table
	await prisma.exercise.deleteMany();

	await prisma.exercise.create({
		data: {
			name: 'Bench Press',
			description:
				'The bench press is an upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Squat',
			description:
				'The squat is a compound, full-body exercise that works more than one muscle group. This powerful exercise helps tone your glutes, strengthen your body and burn a lot of calories.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Deadlift',
			description:
				'The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Overhead Press',
			description:
				'The overhead press is a compound movement that targets a number of muscles in the upper body. The overhead press is a great exercise to build strength and muscle in the shoulders, upper back, and arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Barbell Row',
			description:
				'The barbell row is a compound exercise that targets a number of muscles in the back, most notably the latissimus dorsi (or “lats”).',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Pull Up',
			description:
				'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands and pulls up.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Curl',
			description:
				'The dumbbell curl is a classic biceps-building exercise. Gripping a dumbbell in each hand, stand up straight with your knees slightly bent and your elbows locked at your sides.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Tricep Extension',
			description:
				'The triceps extension is an isolation exercise that targets your triceps brachii, the muscle that runs along the back of your upper arm. This exercise is commonly performed with a dumbbell, but you can also use a barbell, EZ bar, or machine.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Fly',
			description:
				'The dumbbell fly is a popular exercise for the pectoral muscles. It is performed by holding lightweight dumbbells in both hands and lying on a bench or exercise ball.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Lateral Raise',
			description:
				'The dumbbell lateral raise is a great exercise for building strength and size in your lateral deltoids, which are the muscles on the sides of your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Front Raise',
			description:
				'The dumbbell front raise is a great exercise for building strength and size in your front deltoids, which are the muscles on the front of your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Shoulder Press',
			description:
				'The dumbbell shoulder press is a great exercise for building strength and size in your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Shrug',
			description:
				'The dumbbell shrug is a great exercise for building strength and size in your traps.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Squat',
			description:
				'The dumbbell squat is a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Lunge',
			description:
				'The dumbbell lunge is a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Calf Raise',
			description:
				'The dumbbell calf raise is a great exercise for building strength and size in your calves.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Crunch',
			description:
				'The dumbbell crunch is a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Russian Twist',
			description:
				'The dumbbell russian twist is a great exercise for building strength and size in your obliques.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Side Bend',
			description:
				'The dumbbell side bend is a great exercise for building strength and size in your obliques.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Arnolds',
			description:
				'Arnolds are a great exercise for building strength and size in your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Hip Flexor Curl',
			description:
				'Hip flexor curls are a great exercise for building strength and size in your hip flexors.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Lat Pulldown',
			description:
				'Lat pulldowns are a great exercise for building strength and size in your back.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Bench Press',
			description:
				'The dumbbell bench press is a great exercise for building strength and size in your chest.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dumbbell Incline Bench Press',
			description:
				'The dumbbell incline bench press is a great exercise for building strength and size in your chest.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Run',
			description:
				'Running is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Sprint',
			description:
				'Sprinting is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Jump Rope',
			description:
				'Jumping rope is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Swim',
			description:
				'Swimming is a great exercise for building strength and size in your arms and legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Bike',
			description:
				'Biking is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Row',
			description:
				'Rowing is a great exercise for building strength and size in your arms and legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Climb',
			description:
				'Climbing is a great exercise for building strength and size in your arms and legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Hike',
			description:
				'Hiking is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Walk',
			description:
				'Walking is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Pullup',
			description:
				'Pullups are a great exercise for building strength and size in your back and arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Dip',
			description:
				'Dips are a great exercise for building strength and size in your chest and arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Pushup',
			description:
				'Pushups are a great exercise for building strength and size in your chest and arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Situp',
			description:
				'Situps are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Plank',
			description:
				'Planks are a great exercise for building strength and size in your abs.',
			type: ExerciseType.DURATION,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Crunch',
			description:
				'Crunches are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Leg Raise',
			description:
				'Leg raises are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Flutter Kick',
			description:
				'Flutter kicks are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Bicycle Crunch',
			description:
				'Bicycle crunches are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Russian Twist',
			description:
				'Russian twists are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Mountain Climber',
			description:
				'Mountain climbers are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Burpee',
			description:
				'Burpees are a great exercise for building strength and size in your entire body.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Jumping Jack',
			description:
				'Jumping jacks are a great exercise for building strength and size in your entire body.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'High Knees',
			description:
				'High knees are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	// create more exercises here

	await prisma.exercise.create({
		data: {
			name: 'Jump Squat',
			description:
				'Jump squats are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Lunge',
			description:
				'Weight Lunge are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Leg Press',
			description:
				'Leg Press are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Leg Curl',
			description:
				'Leg Curl are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Leg Extension',
			description:
				'Leg Extension are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Skull Crusher',
			description:
				'Skull Crusher are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Hammer Curl',
			description:
				'Hammer Curl are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Reverse Curl',
			description:
				'Reverse Curl are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Preacher Curl',
			description:
				'Preacher Curl are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Tricep Pull Down',
			description:
				'Tricep Pull Downs are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Bulgarian Split Squat',
			description:
				'Bulgarian Split Squats are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
	});

	await prisma.exercise.create({
		data: {
			name: 'Horizontal Row',
			description:
				'Horizontal Rows are a great exercise for building strength and size in your back.',
			type: ExerciseType.WEIGHTED,
		},
	});
};
await prisma.$disconnect();

export default seedExercises;
