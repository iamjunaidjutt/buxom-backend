const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const getImages = async (req, res) => {
	try {
		const images = await prisma.image.findMany();
		res.status(200).json(images);
	} catch (error) {
		res.status(400).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const getImage = async (req, res) => {
	const { id } = req.params;
	try {
		const image = await prisma.image.findUnique({
			where: { id },
		});
		res.status(200).json(image);
	} catch (error) {
		res.status(400).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const deleteImage = async (req, res) => {
	const { id } = req.params;
	try {
		const image = await prisma.image.delete({
			where: { id: parseInt(id) },
		});
		res.status(200).json(image);
	} catch (error) {
		res.status(400).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const createImage = async (req, res) => {
	const { file } = req.body;
	try {
		const image = await prisma.image.create({
			data: { imageURLs: file },
		});
		res.status(200).json(image);
	} catch (error) {
		res.status(400).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

const updateImage = async (req, res) => {
	const { id } = req.params;
	const { file } = req.body;
	try {
		const image = await prisma.image.update({
			where: { id: parseInt(id) },
			data: { imageURLs: file },
		});
		res.status(200).json(image);
	} catch (error) {
		res.status(400).json({ error: error.message });
	} finally {
		await prisma.$disconnect();
	}
};

module.exports = {
	getImages,
	getImage,
	deleteImage,
	createImage,
	updateImage,
};
