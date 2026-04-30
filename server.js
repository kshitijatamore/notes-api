require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));  

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Notes API is live ");
});

// Routes
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

app.use("/", userRoutes);
app.use("/", noteRoutes);

// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});