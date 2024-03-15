const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createShade = async (req, res) => {
	const { name, description, code } = req.body;
	try {
		const shade = await prisma.shade.create({
			data: {
				name,
				description,
				code,
			},
		});
		res.status(201).json(shade);
		console.log("Shade created successfully: ", shade);
	} catch (error) {
		res.error(404).json({ error: "Shade not created!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getShade = async (req, res) => {
	const { id } = req.params;
	try {
		const shade = await prisma.shade.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(shade);
		console.log("Shade: ", shade);
	} catch (error) {
		res.error(404).json({ error: "Shade not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getAllShades = async (req, res) => {
	try {
		const shades = await prisma.shade.findMany();
		res.status(200).json(shades);
		console.log("Shades: ", shades);
	} catch (error) {
		res.error(404).json({ error: "Shades not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const deleteShade = async (req, res) => {
	const { id } = req.params;
	try {
		const shade = await prisma.shade.delete({
			where: {
				id,
			},
		});
		res.status(200).json(shade);
		console.log("Shade deleted successfully: ", shade);
	} catch (error) {
		res.error(404).json({ error: "Shade not deleted!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const updateShade = async (req, res) => {
	const { id } = req.params;
	const { name, description, code } = req.body;
	try {
		const shade = await prisma.shade.update({
			where: {
				id,
			},
			data: {
				name,
				description,
				code,
			},
		});
		res.status(200).json(shade);
		console.log("Shade updated successfully: ", shade);
	} catch (error) {
		res.error(404).json({ error: "Shade not updated!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

module.exports = {
	createShade,
	getShade,
	getAllShades,
	deleteShade,
	updateShade,
};
