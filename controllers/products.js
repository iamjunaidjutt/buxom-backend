const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createProduct = async (req, res) => {
	try {
		const {
			name,
			price,
			description,
			thumbnail,
			stock,
			category,
			shades,
			tags,
			badges,
			images,
		} = req.body;

		if (!name || !price || !description || !stock || !category) {
			throw new Error("All fields are required");
		}

		console.log(req.body);

		const product = await prisma.product.create({
			data: {
				name,
				price,
				description,
				stock,
				thumbnail,
				category: {
					connect: {
						id: category,
					},
				},
				shades: {
					connect: shades.map((shade) => ({ id: shade })),
				},
				Tags: {
					connect: tags.map((tag) => ({ id: tag })),
				},
				Badges: {
					connect: badges.map((badge) => ({ id: badge })),
				},
				Image: {
					connect: images.map((image) => ({ id: image })),
				},
			},
			include: {
				category: true,
				Tags: true,
				Badges: true,
				Image: true,
				shades: true,
			},
		});
		res.status(201).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getProducts = async (req, res) => {
	try {
		const products = await prisma.product.findMany({
			include: {
				category: true,
				Tags: true,
				Badges: true,
				Image: true,
				shades: true,
			},
		});
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getProductsByCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const products = await prisma.product.findMany({
			where: {
				categoryId: id,
			},
			include: {
				category: true,
				Tags: true,
				Badges: true,
				Image: true,
				shades: true,
			},
		});
		res.status(200).json(products);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				category: true,
				Tags: true,
				Badges: true,
				Image: true,
				shades: true,
			},
		});
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateProduct = async (req, res) => {
	console.log(req.body);
	try {
		const { id } = req.params;
		const {
			name,
			price,
			description,
			stock,
			thumbnail,
			category,
			shades,
			Tags,
			Badges,
			Image,
		} = req.body;
		const product = await prisma.product.update({
			where: {
				id,
			},
			data: {
				name,
				price,
				description,
				stock,
				thumbnail,
				category: {
					connect: {
						id: category,
					},
				},
				shades: {
					connect: shades.map((shade) => ({ id: shade })),
				},
				Tags: {
					connect: Tags.map((tag) => ({ id: tag })),
				},
				Badges: {
					connect: Badges.map((badge) => ({ id: badge })),
				},
				Image: {
					connect: Image.map((image) => ({ id: image })),
				},
			},
			include: {
				category: true,
				Tags: true,
				Badges: true,
				Image: true,
				shades: true,
			},
		});
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await prisma.product.delete({
			where: {
				id,
			},
		});
		res.status(200).json(product);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	createProduct,
	getProducts,
	getProductById,
	getProductsByCategory,
	updateProduct,
	deleteProduct,
};
