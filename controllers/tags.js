const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const getTags = async (req, res) => {
	try {
		const tags = await prisma.tag.findMany();
		res.status(200).json(tags);
	} catch (error) {
		res.status(500).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const getTag = async (req, res) => {
	const { id } = req.params;
	try {
		const tag = await prisma.tag.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(tag);
	} catch (error) {
		res.status(500).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const createTag = async (req, res) => {
	const { name } = req.body;
	try {
		const tag = await prisma.tag.create({
			data: {
				name,
			},
		});
		res.status(201).json(tag);
	} catch (error) {
		res.status(500).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const updateTag = async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	try {
		const tag = await prisma.tag.update({
			where: {
				id,
			},
			data: {
				name,
			},
		});
		res.status(200).json(tag);
	} catch (error) {
		res.status(500).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const deleteTag = async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.tag.delete({
			where: {
				id,
			},
		});
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

module.exports = {
	getTags,
	getTag,
	createTag,
	updateTag,
	deleteTag,
};
