const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createProduct = async (req, res) => {
	const { name, price, category } = req.body;
	try {
		const product = await prisma.product.create({
			data: {
				name,
				price,
				category,
			},
		});
		res.status(201).json(product);
		console.log("Product created successfully: ", product);
	} catch (error) {
		res.error(404).json({ error: "Product not created!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(product);
		console.log("Product: ", product);
	} catch (error) {
		res.error(404).json({ error: "Product not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getProducts = async (req, res) => {
	try {
		const products = await prisma.product.findMany();
		res.status(200).json(products);
		console.log("All products: ", products);
	} catch (error) {
		res.error(404).json({ error: "Products not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

module.exports = {
	createProduct,
	getProducts,
	getProduct,
};
