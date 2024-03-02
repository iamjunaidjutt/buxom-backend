const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createUser = async (req, res) => {
	const { first_name, last_name, email, password, phone } = req.body;
	try {
		const user = await prisma.user.create({
			data: {
				first_name,
				last_name,
				email,
				password,
				phone,
			},
		});
		res.status(201).json(user);
		console.log("User created successfully: ", user);
	} catch (error) {
		res.error(404).json({ error: "User not created!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getUser = async (req, res) => {
	const { email, password } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
				password,
			},
		});
		res.status(200).json(user);
		console.log("User: ", user);
	} catch (error) {
		res.error(404).json({ error: "User not found!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

module.exports = {
	createUser,
	getUser,
};
