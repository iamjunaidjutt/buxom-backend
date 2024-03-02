const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createReview = async (req, res) => {
	const { product_id, user_id, rating, comment } = req.body;
	try {
		const review = await prisma.review.create({
			data: {
				product_id,
				user_id,
				rating,
				comment,
			},
		});
		res.status(201).json(review);
		console.log("Review created successfully: ", review);
	} catch (error) {
		res.error(404).json({ error: "Review not created!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getReview = async (req, res) => {
	const { id } = req.params;
	try {
		const review = await prisma.review.findUnique({
			where: {
				id,
			},
		});
		res.status(200).json(review);
		console.log("Review: ", review);
	} catch (error) {
		res.error(404).json({ error: "Review not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getReviews = async (req, res) => {
	try {
		const reviews = await prisma.review.findMany();
		res.status(200).json(reviews);
		console.log("All reviews: ", reviews);
	} catch (error) {
		res.error(404).json({ error: "Reviews not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

module.exports = {
	createReview,
	getReviews,
	getReview,
};
