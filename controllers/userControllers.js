const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validationResult } =require("express-validator");

// REGISTER
exports.registerUser = async (req, res) => {
 try{   const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() });
}
    const { name, age, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        name,
        age,
        email,
        password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered" });
} catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
      details: err.message
    });
}
};

// LOGIN
exports.loginUser = async (req, res) => {
   try{ const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user){
         return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(401).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
        { id: user._id },
        "secretkey",
        { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
}  catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Something went wrong",
      details: err.message
    });
}
};