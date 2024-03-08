const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createCategory = async (req, res) => {
	const { name, description, file } = req.body;
	try {
		const category = await prisma.category.create({
			data: {
				name,
				description,
				imageURL: file || null,
			},
		});
		res.status(201).json(category);
		console.log("Category created successfully: ", category);
	} catch (error) {
		res.error(404).json({ error: "Category not created!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getCategory = async (req, res) => {
	const { id } = req.params;
	try {
		const category = await prisma.category.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(category);
		console.log("Category: ", category);
	} catch (error) {
		res.error(404).json({ error: "Category not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getCategories = async (req, res) => {
	try {
		const categories = await prisma.category.findMany();
		res.status(200).json(categories);
		console.log("All categories: ", categories);
	} catch (error) {
		res.error(404).json({ error: "Categories not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

module.exports = {
	createCategory,
	getCategories,
	getCategory,
};
