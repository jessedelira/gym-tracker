import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedTimezones = async () => {
	const result = await prisma.timezoneMap.findMany();

	// Update value to reflect number of timezones in the database
	if (result.length > 0) {
		console.log('Timezones already seeded');
		return;
	} else {
		// Wipe table
		await prisma.timezoneMap.deleteMany();

		const timezones = [
			{ iana: 'America/New_York', display: 'Eastern Standard Time (EST)' },
			{ iana: 'America/Chicago', display: 'Central Standard Time (CST)' },
			{ iana: 'America/Denver', display: 'Mountain Standard Time (MST)' },
			{ iana: 'America/Los_Angeles', display: 'Pacific Standard Time (PST)' },
			{ iana: 'Asia/Kolkata', display: 'Indian Standard Time (IST)' },
			{ iana: 'Europe/Paris', display: 'Central European Time (CET)' },
			{ iana: 'Europe/Istanbul', display: 'Eastern European Time (EET)' },
			{ iana: 'Asia/Tokyo', display: 'Japan Standard Time (JST)' },
			// Add more timezones as needed
		];

		for (const tz of timezones) {
			await prisma.timezoneMap.create({
				data: tz,
			});
		}
	}

	await prisma.$disconnect();
};

export default seedTimezones;
