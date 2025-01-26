import { PrismaClient, type User } from '@prisma/client';

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
		const createdUser = await prisma.user.create({
			data: {
				username: 'superuser',
				password:
					'$2b$10$00KSEDAm4EqdfS94ukk9e.uuiPxUdR8Si.sbSGHCFzZ4qkNcw2M3e',
				firstName: 'super',
				lastName: 'user',
			},
		});

		const user = await prisma.user.findUnique({
			where: {
				username: 'superuser',
			},
		});

		if (!user) {
			console.log('Failed to create user');
			return;
		}

		await prisma.userPreference.create({
			data: {
				userId: user.id,
				preference: 'CONFETTI_ON_SESSION_COMPLETION',
				enabled: true,
			},
		});

		await prisma.userPreference.create({
			data: {
				userId: user.id,
				preference: 'SHOW_ELAPSED_SECONDS_IN_ACTIVE_SESSION',
				enabled: true,
			},
		});

		const estTimezone = await prisma.timezoneMap.findFirst({
			where: {
				display: 'Eastern Standard Time (EST)',
			},
		});

		if (!estTimezone) {
			throw new Error('Failed to find timezone');
		}

		await prisma.userSetting.create({
			data: {
				userId: user.id,
				timezoneId: estTimezone.id,
			},
		});

		await seedSuperuserData(createdUser);
	}
	await prisma.$disconnect();
};

const seedSuperuserData = async (createdUser: User) => {
	const routine = await prisma.routine.create({
		data: {
			name: 'Superuser Routine',
			description: 'Superuser Routine',
			userId: createdUser.id,
			isActive: true,
			createdAt: new Date(),
		},
	});

	const exerciseIds = await prisma.exercise.findMany();

	await prisma.session.create({
		data: {
			routineId: routine.id,
			userId: createdUser.id,
			name: 'Superuser Session',
			description: 'Superuser Session',
			createdAt: new Date(),
			days: {
				create: [
					{
						day: 'Monday',
					},
					{
						day: 'Tuesday',
					},
					{
						day: 'Wednesday',
					},
					{
						day: 'Thursday',
					},
					{
						day: 'Friday',
					},
					{
						day: 'Saturday',
					},
					{
						day: 'Sunday',
					},
				],
			},
			workouts: {
				create: [
					{
						exerciseId: exerciseIds[0]?.id || '',
						reps: 10,
						sets: 3,
						weightLbs: 100,
						userId: createdUser.id,
					},
					{
						exerciseId: exerciseIds[1]?.id || '',
						reps: 10,
						sets: 3,
						weightLbs: 100,
						userId: createdUser.id,
					},
					{
						exerciseId: exerciseIds[2]?.id || '',
						reps: 10,
						sets: 3,
						weightLbs: 100,
						userId: createdUser.id,
					},
					{
						exerciseId: exerciseIds[3]?.id || '',
						reps: 10,
						sets: 3,
						weightLbs: 100,
						userId: createdUser.id,
					},
				],
			},
		},
	});
};

export default seedUsers;
