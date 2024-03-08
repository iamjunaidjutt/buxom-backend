const express = require("express");
const path = require("path");
const cors = require("cors");
const { createUser } = require("./controllers/users");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT | 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes/root"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/reviews", require("./routes/reviews"));
app.use("/users", require("./routes/users"));

// multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "public", "uploads"));
		console.log(path.join(__dirname, "public", "uploads"));
		console.log("file: ", file);
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "_" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
	console.log(req.file);
	try {
		res.status(200).send({ path: `/uploads/${req.file.filename}` });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
});

// unwanted routes handler
app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		res.json({ error: "404 not found!" });
	} else if (req.accepts("txt")) {
		res.type("txt").send("404 not found!");
	}
});

app.listen(PORT, () => {
	console.log(`app is listening on port ${PORT}`);
});
