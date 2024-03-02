const express = require("express");
const path = require("path");
const cors = require("cors");
const { createUser, getUsers } = require("./controllers/users");

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
app.use("/users", require("./routes/users"));
app.use("/cart", require("./routes/cart"));
app.use("/reviews", require("./routes/reviews"));

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