const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });

const createUser = async (req, res) => {
	const { firstname, lastname, email, password, phone, role } = req.body;

	if (!firstname || !lastname || !email || !password || !phone || !role) {
		console.log(firstname, lastname, email, password, phone, role);
		return res.status(400).json({ error: "All fields are required!" });
	}

	let user;

	if (role == "USER") {
		const { month, day, newsLetter, smsUpdates } = req.body;
		if (!month || !day || !newsLetter || !smsUpdates) {
			console.log(
				firstname,
				lastname,
				email,
				password,
				phone,
				role,
				month,
				day,
				newsLetter,
				smsUpdates
			);
			return res.status(400).json({ error: "All fields are required!" });
		}

		try {
			user = await prisma.user.create({
				data: {
					first_name: firstname,
					last_name: lastname,
					email,
					password,
					phone,
					role,
					UserPreference: {
						create: {
							month,
							day: parseInt(day),
							newsLetter,
							smsUpdates,
						},
					},
				},
				include: {
					UserPreference: true,
				},
			});
		} catch (error) {
			res.status(500).json({ error: "User not created!" });
			console.error("Error: ", error);
		}
	} else {
		try {
			user = await prisma.user.create({
				data: {
					first_name: firstname,
					last_name: lastname,
					email,
					password,
					phone,
					role,
				},
			});
		} catch (error) {
			res.status(500).json({ error: "User not created!" });
			console.error("Error: ", error);
		}
	}

	if (user) {
		res.status(201).json(user);
		console.log("User created successfully: ", user);
	}

	prisma.$disconnect();
};

const getUser = async (req, res) => {
	const { email, password, role } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (user.password !== password || user.role !== role) {
			console.log("User found: ", user);
			res.status(401).json({ error: "Invalid credentials!" });
		}
		console.log("User: ", user);
		res.status(200).json(user);
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
