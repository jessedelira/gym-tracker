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
		{
			name: 'Kettlebell Swing',
			description:
				'A dynamic exercise using a kettlebell that targets the hips, glutes, hamstrings, lats, abs, shoulders, and grip.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Turkish Get-Up',
			description:
				'A complex kettlebell exercise that builds total-body strength, stability, and mobility.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Clean',
			description:
				'A kettlebell exercise where you explosively pull the weight from the floor to the rack position.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Press',
			description:
				'An overhead pressing exercise performed with a kettlebell to build shoulder strength and stability.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Snatch',
			description:
				'An explosive full-body exercise where a kettlebell is pulled from the floor to overhead in one fluid motion.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Goblet Squat (Kettlebell)',
			description:
				'A squat variation where you hold a kettlebell close to your chest, great for building lower body strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Windmill',
			description:
				'A mobility exercise where you hold a kettlebell overhead while hinging to the side.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Row',
			description:
				'A rowing exercise performed with a kettlebell to build back strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: "Kettlebell Farmer's Carry",
			description:
				'A functional exercise where you walk while holding kettlebells at your sides to build grip and core strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Lunge',
			description:
				'A lunge exercise while holding kettlebells to increase difficulty and build leg strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Russian Twist',
			description:
				'A rotational core exercise performed with a kettlebell.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Figure 8',
			description:
				'A dynamic exercise where you pass a kettlebell through and around your legs in a figure 8 pattern.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Halo',
			description:
				'A shoulder mobility exercise where you move a kettlebell in a circle around your head.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell High Pull',
			description:
				'An explosive exercise where you pull the kettlebell up to shoulder height with force.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Battle Ropes',
			description:
				'A high-intensity exercise using heavy ropes to build cardio, strength, and power.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Medicine Ball Slam',
			description:
				'An explosive full-body exercise where you slam a medicine ball into the ground.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Box Jumps',
			description:
				'A plyometric exercise where you jump onto an elevated platform or box.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Sandbag Carry',
			description:
				'A functional exercise where you carry a heavy sandbag to build grip, core, and overall strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Renegade Row',
			description:
				'A plank position exercise with weights where you perform rows while stabilizing your body.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: "Farmer's Walk",
			description:
				'A functional exercise where you walk while holding heavy weights at your sides.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Deadlift',
			description:
				'A deadlift variation performed with one or two kettlebells.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Front Squat',
			description:
				'A squat performed with kettlebells held in the front rack position.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Racked Carry',
			description:
				'A loaded carry with kettlebells held in the front rack position to build core and shoulder stability.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Kettlebell Bottoms-Up Press',
			description:
				'A challenging press where the kettlebell is held upside down by the handle, requiring extreme grip and shoulder stability.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Sled Push',
			description:
				'A full-body strength and conditioning exercise involving pushing a weighted sled.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Sled Pull',
			description:
				'A strength and conditioning exercise involving pulling a weighted sled.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'TRX Row',
			description:
				'A suspension trainer exercise targeting the back and arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'TRX Chest Press',
			description:
				'A suspension trainer exercise targeting the chest and triceps.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'TRX Pike',
			description: 'A core-focused suspension trainer exercise.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Wall Ball',
			description:
				'A functional exercise involving throwing a medicine ball at a wall.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Assault Bike',
			description: 'A high-intensity cardio exercise using a fan bike.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Ski Erg',
			description: 'A cardio machine simulating Nordic skiing.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Stair Climber',
			description: 'A cardio machine simulating stair climbing.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Glute Bridge',
			description:
				'A bodyweight exercise targeting the glutes and hamstrings.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Hip Thrust',
			description:
				'A glute-focused exercise performed with a barbell or bodyweight.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Donkey Kick',
			description: 'A bodyweight exercise targeting the glutes.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Fire Hydrant',
			description:
				'A bodyweight exercise for hip mobility and glute activation.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Bird Dog',
			description:
				'A core and stability exercise performed on hands and knees.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Superman',
			description:
				'A bodyweight exercise for lower back and glute strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Inchworm',
			description:
				'A dynamic warm-up exercise improving flexibility and core strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Bear Crawl',
			description:
				'A full-body movement exercise performed crawling on hands and feet.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Crab Walk',
			description:
				'A bodyweight exercise performed walking on hands and feet facing upward.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Handstand Hold',
			description: 'A gymnastic isometric hold in a handstand position.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Wall Sit',
			description:
				'A lower body isometric hold performed against a wall.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Pistol Squat',
			description:
				'A challenging single-leg squat performed with one leg extended forward.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Box Step-Up',
			description:
				'A lower body exercise stepping onto a box or platform.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Reverse Lunge',
			description:
				'A lunge variation stepping backward instead of forward.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Curtsy Lunge',
			description:
				'A lunge variation stepping the leg behind and across the body.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Side Lunge',
			description: 'A lunge variation stepping out to the side.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Good Morning',
			description:
				'A hip hinge exercise performed with a barbell or bodyweight.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Seated Row Machine',
			description: 'A machine-based exercise for the back and arms.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Pec Deck Reverse Fly',
			description:
				'A machine-based exercise targeting the rear delts and upper back.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Cable Face Pull',
			description: 'A cable exercise for rear delts and upper back.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Scapular Pull-Up',
			description:
				'A pull-up variation focusing on scapular movement for shoulder health and strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Archer Push-Up',
			description:
				'A push-up variation with one arm extended to the side, increasing unilateral strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Planche Lean',
			description:
				'A bodyweight exercise to build planche strength by leaning forward in a push-up position.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Nordic Hamstring Curl',
			description:
				'A hamstring exercise performed by lowering the body from a kneeling position, focusing on eccentric strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Jefferson Curl',
			description:
				'A mobility and strength exercise for the posterior chain, performed with a rounded back.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Sissy Squat',
			description:
				'A challenging squat variation emphasizing knee extension and quad strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Reverse Hyperextension',
			description:
				'A posterior chain exercise performed on a reverse hyper machine or bench.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Landmine Press',
			description:
				'A pressing exercise using a barbell anchored at one end, great for shoulders and core.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Landmine Row',
			description:
				'A rowing exercise using a landmine setup for back and arm strength.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Zercher Squat',
			description:
				'A squat variation where the barbell is held in the crook of the elbows.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Copenhagen Plank',
			description:
				'A side plank variation with one leg elevated, targeting the adductors.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'L-Sit',
			description:
				'A gymnastic isometric hold with legs extended straight out while supporting the body on the hands.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Tuck Planche',
			description:
				'A gymnastic hold with knees tucked, building planche strength.',
			type: ExerciseType.DURATION,
		},
		{
			name: 'Serratus Push-Up',
			description:
				'A push-up variation focusing on protracting the shoulder blades to target the serratus anterior.',
			type: ExerciseType.WEIGHTED,
		},
		{
			name: 'Isometric Dead Hang',
			description:
				'A grip and shoulder endurance exercise performed by hanging from a bar.',
			type: ExerciseType.DURATION,
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
