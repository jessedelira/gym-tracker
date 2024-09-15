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
		await prisma.exercise.createMany({
			data: [
				{
					name: 'Back Extension',
					description:
						'A lower-back exercise performed on a hyperextension bench that targets the erector spinae muscles.',
				},
				{
					name: 'Barbell Curl',
					description:
						'A biceps exercise performed by curling a barbell up towards the chest while standing.',
				},
				{
					name: 'Barbell Deadlift',
					description:
						'A compound movement that involves lifting a barbell off the ground to hip level, targeting the lower back, glutes, and hamstrings.',
				},
				{
					name: 'Barbell Row',
					description:
						'A compound exercise that targets the back muscles by pulling a barbell towards the torso while bent over.',
				},
				{
					name: 'Bench Press',
					description:
						'An upper-body exercise where a weight is pressed upwards while lying on a bench, targeting the chest, shoulders, and triceps.',
				},
				{
					name: 'Bent-Over Dumbbell Row',
					description:
						'A back exercise performed by bending over and pulling dumbbells towards the torso.',
				},
				{
					name: 'Bicep Curl',
					description:
						'An isolation exercise targeting the biceps, performed by curling weights towards the shoulder.',
				},
				{
					name: 'Box Jump',
					description:
						'A plyometric exercise that involves jumping onto a box or elevated surface to build explosive power.',
				},
				{
					name: 'Bulgarian Split Squat',
					description:
						'A single-leg exercise where one foot is elevated behind on a bench and the other leg performs a squat.',
				},
				{
					name: 'Cable Fly',
					description:
						'A chest isolation exercise performed with cables that targets the pectoral muscles.',
				},
				{
					name: 'Cable Tricep Pushdown',
					description:
						'An isolation exercise that targets the triceps using a cable machine with a pushdown motion.',
				},
				{
					name: 'Calf Raise',
					description:
						'An exercise that targets the calf muscles by raising the heels off the ground while standing or seated.',
				},
				{
					name: 'Chin-Up',
					description:
						'An upper-body exercise performed by pulling oneself up on a bar using a supinated grip to target the biceps and back.',
				},
				{
					name: 'Clean and Jerk',
					description:
						'A compound Olympic lift involving lifting a barbell from the ground to overhead in two movements: the clean and the jerk.',
				},
				{
					name: 'Crunch',
					description:
						'An abdominal exercise where the upper body is curled towards the pelvis, targeting the core muscles.',
				},
				{
					name: 'Dead Bug',
					description:
						'A core exercise performed on the back where opposite arm and leg are extended while the other arm and leg are held still.',
				},
				{
					name: 'Dips',
					description:
						'An upper-body exercise that targets the chest, shoulders, and triceps by lowering and raising the body on parallel bars.',
				},
				{
					name: 'Dumbbell Bench Press',
					description:
						'A chest exercise similar to the bench press, performed with dumbbells for greater range of motion and stabilization.',
				},
				{
					name: 'Dumbbell Curl',
					description:
						'A bicep isolation exercise performed by curling dumbbells towards the shoulders.',
				},
				{
					name: 'Dumbbell Fly',
					description:
						'A chest isolation exercise where dumbbells are brought together in a fly motion while lying on a bench.',
				},
				{
					name: 'Dumbbell Lateral Raise',
					description:
						'A shoulder exercise that targets the lateral deltoid by raising dumbbells to the side.',
				},
				{
					name: 'Dumbbell Shoulder Press',
					description:
						'An overhead press exercise targeting the shoulder muscles using dumbbells.',
				},
				{
					name: 'Dumbbell Squat',
					description:
						'A lower-body exercise that involves squatting while holding dumbbells for added resistance.',
				},
				{
					name: 'Face Pull',
					description:
						'A shoulder and upper back exercise performed using a rope attachment on a cable machine pulled towards the face.',
				},
				{
					name: "Farmer's Walk",
					description:
						'A functional strength exercise that involves walking while holding heavy weights in each hand.',
				},
				{
					name: 'Front Squat',
					description:
						'A squat variation with the barbell held in front of the shoulders, targeting the quads and core.',
				},
				{
					name: 'Glute Bridge',
					description:
						'An exercise targeting the glutes and hamstrings by lifting the hips while lying on the back.',
				},
				{
					name: 'Good Morning',
					description:
						'A posterior chain exercise that involves bending at the hips while keeping the back straight, targeting the hamstrings and lower back.',
				},
				{
					name: 'Hack Squat',
					description:
						'A squat variation performed on a machine that targets the quads, glutes, and hamstrings.',
				},
				{
					name: 'Hammer Curl',
					description:
						'A variation of the bicep curl where the palms face each other, targeting the biceps and forearms.',
				},
				{
					name: 'Hanging Leg Raise',
					description:
						'An abdominal exercise performed by hanging from a bar and raising the legs.',
				},
				{
					name: 'Hip Thrust',
					description:
						'A glute-focused exercise performed by thrusting the hips upwards while the upper back is supported on a bench.',
				},
				{
					name: 'Incline Bench Press',
					description:
						'A variation of the bench press performed on an incline bench, targeting the upper chest.',
				},
				{
					name: 'Kettlebell Swing',
					description:
						'A dynamic movement that involves swinging a kettlebell from between the legs to shoulder height, targeting the glutes and hamstrings.',
				},
				{
					name: 'Lat Pulldown',
					description:
						'A back exercise performed on a cable machine by pulling a bar down towards the chest.',
				},
				{
					name: 'Leg Curl',
					description:
						'An isolation exercise for the hamstrings performed on a machine by curling the legs towards the buttocks.',
				},
				{
					name: 'Leg Press',
					description:
						'A lower-body exercise performed on a machine where the legs are pressed against resistance.',
				},
				{
					name: 'Leg Raise',
					description:
						'An abdominal exercise that involves raising the legs while lying on the back or hanging from a bar.',
				},
				{
					name: 'Lunge',
					description:
						'A lower-body exercise where one leg is stepped forward into a bent-knee position while the other remains stationary, targeting the quads and glutes.',
				},
				{
					name: 'Machine Fly',
					description:
						'A chest exercise performed on a machine that isolates the pectoral muscles by bringing the arms together in a fly motion.',
				},
				{
					name: 'Mountain Climbers',
					description:
						'A bodyweight exercise that targets the core by alternating the knees towards the chest in a plank position.',
				},
				{
					name: 'Overhead Press',
					description:
						'A shoulder exercise where a barbell or dumbbells are pressed overhead while standing or seated.',
				},
				{
					name: 'Pec Deck Machine',
					description:
						'A chest exercise performed on a machine that isolates the pectoral muscles by bringing the arms together.',
				},
				{
					name: 'Plank',
					description:
						'A core exercise that involves holding a push-up position with the body straight and the forearms on the ground.',
				},
				{
					name: 'Pull-Up',
					description:
						'An upper-body exercise performed by pulling oneself up on a bar using a pronated grip to target the back and biceps.',
					isAerobic: true,
				},
				{
					name: 'Push-Up',
					description:
						'A bodyweight exercise that targets the chest, shoulders, and triceps by lowering and raising the body with the hands on the ground.',
				},
				{
					name: 'Reverse Lunge',
					description:
						'A variation of the lunge where the step is taken backwards, targeting the glutes and hamstrings.',
				},
				{
					name: 'Romanian Deadlift',
					description:
						'A deadlift variation that targets the hamstrings and glutes by keeping the legs straighter and hinging at the hips.',
				},
				{
					name: 'Russian Twist',
					description:
						'A core exercise that involves twisting the torso from side to side while seated, targeting the obliques.',
				},
				{
					name: 'Seated Cable Row',
					description:
						'A back exercise performed by pulling a cable handle towards the torso while seated, targeting the lats and rhomboids.',
				},
				{
					name: 'Shoulder Press Machine',
					description:
						'A machine-based shoulder exercise that involves pressing weight overhead, targeting the deltoids.',
				},
				{
					name: 'Side Plank',
					description:
						'A core exercise where the body is held in a straight line while resting on one forearm, targeting the obliques.',
				},
				{
					name: 'Skull Crusher',
					description:
						'A tricep exercise performed by lying on a bench and lowering a barbell or dumbbells towards the forehead.',
				},
				{
					name: 'Squat',
					description:
						'A fundamental lower-body exercise where the hips are lowered from a standing position, targeting the quads, glutes, and hamstrings.',
				},
				{
					name: 'Step-Up',
					description:
						'A lower-body exercise that involves stepping onto an elevated surface, targeting the quads and glutes.',
				},
				{
					name: 'T-Bar Row',
					description:
						'A back exercise performed by pulling a T-bar handle towards the chest while bent over, targeting the middle back and lats.',
				},
				{
					name: 'Tricep Dip',
					description:
						'An upper-body exercise targeting the triceps by lowering and raising the body using parallel bars or a bench.',
				},
				{
					name: 'Tricep Extension',
					description:
						'An isolation exercise that targets the triceps, performed by extending the arm while holding a dumbbell or cable overhead.',
				},
				{
					name: 'Tricep Kickback',
					description:
						'A tricep exercise performed by extending the arm backward while bent over, holding a dumbbell.',
				},
				{
					name: 'Upright Row',
					description:
						'A shoulder exercise that involves lifting a barbell or dumbbells vertically along the front of the body, targeting the deltoids and traps.',
				},
				{
					name: 'Walking Lunge',
					description:
						'A dynamic version of the lunge exercise that involves stepping forward into a lunge position while walking, targeting the quads and glutes.',
				},
				{
					name: 'Wall Sit',
					description:
						'A static exercise that involves holding a sitting position against a wall to target the quads and glutes.',
					isAerobic: true,
				},
				{
					name: 'Weighted Crunch',
					description:
						'An abdominal exercise where added weight is held while performing a crunch, increasing resistance on the core muscles.',
				},
				{
					name: 'Wide-Grip Pull-Up',
					description:
						'A variation of the pull-up that uses a wider grip to emphasize the upper back muscles.',
				},
				{
					name: 'Windshield Wiper',
					description:
						'A core exercise performed by lying on the back and moving the legs side to side in a windshield wiper motion, targeting the obliques.',
				},
				{
					name: 'Wrist Curl',
					description:
						'An isolation exercise that targets the forearm muscles by curling the wrists up and down while holding weights.',
				},
				{
					name: 'Y Raise',
					description:
						'A shoulder exercise that involves raising dumbbells in a Y-shape to target the upper back and shoulders.',
				},
				{
					name: 'Zercher Squat',
					description:
						'A squat variation where the barbell is held in the crook of the elbows, targeting the quads and core for added stability.',
				},
				{
					name: 'Zottman Curl',
					description:
						'A bicep exercise that combines a regular curl and reverse curl to target both the biceps and forearms.',
				},
				{
					name: 'Walk',
					description:
						'A low-impact cardiovascular exercise that involves walking at a moderate pace to improve fitness and health.',
					isAerobic: true,
				},
				{
					name: 'Run',
					description:
						'A high-impact cardiovascular exercise that involves running at a moderate to high intensity to improve fitness and health.',
					isAerobic: true,
				},
			],
		});
	}
	await prisma.$disconnect();
};

export default seedExercises;
