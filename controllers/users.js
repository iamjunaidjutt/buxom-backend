const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({ log: ["query"] });
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
	console.log(req.body);
	const { firstname, lastname, email, password, phone, role } = req.body;

	if (!firstname || !lastname || !email || !password || !phone || !role) {
		console.log(firstname, lastname, email, password, phone, role);
		return res.status(400).json({ error: "All fields are required!" });
	}

	// check if user already exists
	const userExists = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	if (userExists) {
		return res.status(400).json({ error: "User already exists!" });
	}

	// log the role
	console.log("Role: ", role);

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// log the hashed password
	console.log("Hashed Password: ", hashedPassword);

	if (role === "USER") {
		const { month, day, newsLetter, smsUpdates } = req.body;

		if (typeof day === "string") {
			day = parseInt(day);
		}

		try {
			const user = await prisma.user.create({
				data: {
					first_name: firstname,
					last_name: lastname,
					email,
					password: hashedPassword,
					phone,
					role,
					UserPreference: {
						create: {
							month,
							day,
							newsLetter,
							smsUpdates,
						},
					},
				},
				include: {
					UserPreference: true,
				},
			});
			console.log("User: ", user);
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ error: "User not created!" });
			console.error("Error: ", error);
		} finally {
			prisma.$disconnect();
		}
	} else {
		console.log("Admin: ", role);
		try {
			user = await prisma.user.create({
				data: {
					first_name: firstname,
					last_name: lastname,
					email,
					password: hashedPassword,
					phone,
					role,
				},
			});
			console.log("User: ", user);
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ error: "User not created!" });
			console.error("Error: ", error);
		} finally {
			prisma.$disconnect();
		}
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				UserPreference: true,
			},
		});
		if (!user) {
			return res.status(404).json({ error: "User not found! " + id });
		}

		console.log("User: ", user);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ error: "User not found! " + id });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const getUser = async (req, res) => {
	const { email, password, role } = req.body;
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(404).json({ error: "User not found!" });
		}

		// Compare the password & Role
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).json({ error: "Invalid password!" });
		}

		if (user.role !== role) {
			return res.status(401).json({ error: "Unauthorized!" });
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

const getUsers = async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			include: {
				UserPreference: true,
			},
		});
		if (!users) {
			return res.status(404).json({ error: "No users found!" });
		}
		console.log("Users: ", users);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: "Error fetching users!" });
		console.error("Error: ", error);
	} finally {
		prisma.$disconnect();
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { firstname, lastname, email, password, phone, role } = req.body;

	if (!firstname || !lastname || !email || !password || !phone || !role) {
		return res.status(400).json({ error: "All fields are required!" });
	}

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	if (role === "USER") {
		const { month, day, newsLetter, smsUpdates } = req.body;

		if (typeof day === "string") {
			day = parseInt(day);
		}

		try {
			const user = await prisma.user.update({
				where: {
					id,
				},
				data: {
					first_name: firstname,
					last_name: lastname,
					email,
					password: hashedPassword,
					phone,
					role,
					UserPreference: {
						update: {
							month,
							day,
							newsLetter,
							smsUpdates,
						},
					},
				},
				include: {
					UserPreference: true,
				},
			});
			console.log("User: ", user);
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ error: "User not updated!" });
			console.error("Error: ", error);
		} finally {
			prisma.$disconnect();
		}
	} else {
		try {
			user = await prisma.user.update({
				where: {
					id,
				},
				data: {
					first_name: firstname,
					last_name: lastname,
					email,
					password: hashedPassword,
					phone,
					role,
				},
			});
			console.log("User: ", user);
			res.status(200).json(user);
		} catch (error) {
			res.status(500).json({ error: "User not updated!" });
			console.error("Error: ", error);
		} finally {
			prisma.$disconnect();
		}
	}
};

module.exports = {
	createUser,
	getUser,
	getUsers,
	getUserById,
	updateUser,
};
