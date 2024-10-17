const users = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(406).json("Account already exists");
    } else {
      const salt = await bcrypt.genSalt(11);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new users({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(200).json('User registered');
    }
  } catch (error) {
    return res.status(401).json(`Registration failed due to ${error}`);
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      res.send('Please fill the form')
    }else{
      let currentUser = await users.findOne({ email });
      if (currentUser) {
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (isMatch) {
          const token = jwt.sign({ userId: currentUser._id }, process.env.JWT_SECRET);
          return res.status(200).json( {currentUser,token} );
        } else {
          return res.status(402).json('Incorrect Password');
        }
      } else {
        return res.status(406).json('Check your email');
      }
    }
   
  } catch (error) {
    return res.status(401).json(`Login failed due to ${error}`);
  }
};
