const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.use("/", userRoutes);
app.use("/", noteRoutes);

// DB
mongoose.connect("mongodb://127.0.0.1:27017/mydb")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});