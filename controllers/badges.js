const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createBadge = async (req, res) => {
	const { name, color } = req.body;
	try {
		const badge = await prisma.badge.create({
			data: {
				name,
				color,
			},
		});
		res.status(201).json(badge);
		console.log("Badge created successfully: ", badge);
	} catch (error) {
		res.error(404).json({ error: "Badge not created!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getBadges = async (req, res) => {
	try {
		const badges = await prisma.badge.findMany();
		res.status(200).json(badges);
		console.log("Badges: ", badges);
	} catch (error) {
		res.error(404).json({ error: "Badges not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getBadge = async (req, res) => {
	const { id } = req.params;
	try {
		const badge = await prisma.badge.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(badge);
		console.log("Badge: ", badge);
	} catch (error) {
		res.error(404).json({ error: "Badge not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const deleteBadge = async (req, res) => {
	const { id } = req.params;
	try {
		const badge = await prisma.badge.delete({
			where: {
				id,
			},
		});
		res.status(200).json(badge);
		console.log("Badge deleted successfully: ", badge);
	} catch (error) {
		res.error(404).json({ error: "Badge not deleted!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const updateBadge = async (req, res) => {
	const { id } = req.params;
	const { name, color } = req.body;
	try {
		const badge = await prisma.badge.update({
			where: {
				id,
			},
			data: {
				name,
				color,
			},
		});
		res.status(200).json(badge);
		console.log("Badge updated successfully: ", badge);
	} catch (error) {
		res.error(404).json({ error: "Badge not updated!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

module.exports = {
	createBadge,
	getBadges,
	getBadge,
	deleteBadge,
	updateBadge,
};
