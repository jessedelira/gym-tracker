import { ExerciseType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const seedExercises = async () => {
	const exercises = [
		{
			name: 'Bench Press',
			description:
				'The bench press is an upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Squat',
			description:
				'The squat is a compound, full-body exercise that works more than one muscle group. This powerful exercise helps tone your glutes, strengthen your body and burn a lot of calories.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Deadlift',
			description:
				'The deadlift is a weight training exercise in which a loaded barbell or bar is lifted off the ground to the level of the hips, torso perpendicular to the floor, before being placed back on the ground.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Overhead Press',
			description:
				'The overhead press is a compound movement that targets a number of muscles in the upper body. The overhead press is a great exercise to build strength and muscle in the shoulders, upper back, and arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Barbell Row',
			description:
				'The barbell row is a compound exercise that targets a number of muscles in the back, most notably the latissimus dorsi (or “lats”).',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Pull Up',
			description:
				'A pull-up is an upper-body strength exercise. The pull-up is a closed-chain movement where the body is suspended by the hands and pulls up.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Curl',
			description:
				'The dumbbell curl is a classic biceps-building exercise. Gripping a dumbbell in each hand, stand up straight with your knees slightly bent and your elbows locked at your sides.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Tricep Extension',
			description:
				'The triceps extension is an isolation exercise that targets your triceps brachii, the muscle that runs along the back of your upper arm. This exercise is commonly performed with a dumbbell, but you can also use a barbell, EZ bar, or machine.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Fly',
			description:
				'The dumbbell fly is a popular exercise for the pectoral muscles. It is performed by holding lightweight dumbbells in both hands and lying on a bench or exercise ball.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Lateral Raise',
			description:
				'The dumbbell lateral raise is a great exercise for building strength and size in your lateral deltoids, which are the muscles on the sides of your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Front Raise',
			description:
				'The dumbbell front raise is a great exercise for building strength and size in your front deltoids, which are the muscles on the front of your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Shoulder Press',
			description:
				'The dumbbell shoulder press is a great exercise for building strength and size in your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Shrug',
			description:
				'The dumbbell shrug is a great exercise for building strength and size in your traps.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Squat',
			description:
				'The dumbbell squat is a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Lunge',
			description:
				'The dumbbell lunge is a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Calf Raise',
			description:
				'The dumbbell calf raise is a great exercise for building strength and size in your calves.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Crunch',
			description:
				'The dumbbell crunch is a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Russian Twist',
			description:
				'The dumbbell russian twist is a great exercise for building strength and size in your obliques.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Side Bend',
			description:
				'The dumbbell side bend is a great exercise for building strength and size in your obliques.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Arnolds',
			description:
				'Arnolds are a great exercise for building strength and size in your shoulders.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Hip Flexor Curl',
			description:
				'Hip flexor curls are a great exercise for building strength and size in your hip flexors.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Lat Pulldown',
			description:
				'Lat pulldowns are a great exercise for building strength and size in your back.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Bench Press',
			description:
				'The dumbbell bench press is a great exercise for building strength and size in your chest.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Incline Bench Press',
			description:
				'The dumbbell incline bench press is a great exercise for building strength and size in your chest.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Run',
			description:
				'Running is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Sprint',
			description:
				'Sprinting is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Jump Rope',
			description:
				'Jumping rope is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Swim',
			description:
				'Swimming is a great exercise for building strength and size in your arms and legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Bike',
			description:
				'Biking is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Row',
			description:
				'Rowing is a great exercise for building strength and size in your arms and legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Climb',
			description:
				'Climbing is a great exercise for building strength and size in your arms and legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Hike',
			description:
				'Hiking is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Walk',
			description:
				'Walking is a great exercise for building strength and size in your legs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Pullup',
			description:
				'Pullups are a great exercise for building strength and size in your back and arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dip',
			description:
				'Dips are a great exercise for building strength and size in your chest and arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Pushup',
			description:
				'Pushups are a great exercise for building strength and size in your chest and arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Situp',
			description:
				'Situps are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Plank',
			description:
				'Planks are a great exercise for building strength and size in your abs.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Crunch',
			description:
				'Crunches are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Leg Raise',
			description:
				'Leg raises are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Flutter Kick',
			description:
				'Flutter kicks are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Bicycle Crunch',
			description:
				'Bicycle crunches are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Russian Twist',
			description:
				'Russian twists are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Mountain Climber',
			description:
				'Mountain climbers are a great exercise for building strength and size in your abs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Burpee',
			description:
				'Burpees are a great exercise for building strength and size in your entire body.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Jumping Jack',
			description:
				'Jumping jacks are a great exercise for building strength and size in your entire body.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'High Knees',
			description:
				'High knees are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Jump Squat',
			description:
				'Jump squats are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Lunge',
			description:
				'Weight Lunge are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Leg Press',
			description:
				'Leg Press are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Leg Curl',
			description:
				'Leg Curl are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Leg Extension',
			description:
				'Leg Extension are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Skull Crusher',
			description:
				'Skull Crusher are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Hammer Curl',
			description:
				'Hammer Curl are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Reverse Curl',
			description:
				'Reverse Curl are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Preacher Curl',
			description:
				'Preacher Curl are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Tricep Pull Down',
			description:
				'Tricep Pull Downs are a great exercise for building strength and size in your arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Bulgarian Split Squat',
			description:
				'Bulgarian Split Squats are a great exercise for building strength and size in your legs.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Horizontal Row',
			description:
				'Horizontal Rows are a great exercise for building strength and size in your back.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Chest Press Machine',
			description:
				'A machine-based exercise targeting the chest muscles.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Incline Chest Press Machine',
			description:
				'A machine-based incline press targeting the upper chest.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Chest Fly Machine (Pec Deck)',
			description: 'A machine-based fly exercise for the chest.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Incline Dumbbell Flys',
			description:
				'A dumbbell fly exercise performed on an incline bench.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Overhead Dumbbell Triceps Extension',
			description: 'An overhead triceps extension using a dumbbell.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Triceps Rope Pushdowns',
			description:
				'A cable-based triceps pushdown using a rope attachment.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Lat Pulldown Machine',
			description: 'A machine-based exercise targeting the lats.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Seated Cable Row',
			description: 'A cable-based rowing exercise for the back.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'One-arm Dumbbell Row',
			description:
				'A single-arm dumbbell row performed with bench support.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Deadlifts (light/moderate)',
			description:
				'A deadlift variation using dumbbells with light to moderate weight.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Bicep Curls',
			description: 'A classic bicep curl using dumbbells.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Cable Curls',
			description: 'A cable-based bicep curl exercise.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Goblet Squats (Dumbbell)',
			description:
				'A squat variation holding a dumbbell close to the chest.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Romanian Dumbbell Deadlifts',
			description: 'A Romanian deadlift variation using dumbbells.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Lying Leg Curl Machine',
			description: 'A machine-based exercise targeting the hamstrings.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Standing Calf Raises',
			description: 'A standing exercise targeting the calves.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Hanging Leg Raises',
			description: 'A core exercise performed while hanging from a bar.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Seated Dumbbell Shoulder Press',
			description: 'A seated shoulder press using dumbbells.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Reverse Pec Deck',
			description: 'A machine-based exercise targeting the rear delts.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Cable Triceps Extensions',
			description: 'A cable-based triceps extension exercise.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Dumbbell Clean & Press',
			description:
				'A full-body exercise combining a clean and press with dumbbells.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Cable Woodchoppers',
			description:
				'A cable-based core exercise mimicking a woodchopping motion.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Weighted Sit-ups',
			description: 'A sit-up exercise performed with added weight.',
			type: ExerciseType.WEIGHTED,
		},
	];

	for (const exercise of exercises) {
		await prisma.exercise.upsert({
			where: {
				name: exercise.name,
			},
			update: {},
			create: exercise,
		});
	}

	await prisma.$disconnect();
};

export default seedExercises;
