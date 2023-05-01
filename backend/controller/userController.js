const User = require('../model/userModel.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const register = async (req,res) => {

    try {

        const { name, email, password } = req.body;

      if ( !name || !email || !password ){
          return res.status(400).json({ errorMessage: "Please enter all required fields." });
      }

      const existingUser = await User.findOne({ email });

      if (existingUser){
          return res.status(400).json({ errorMessage: "An account with this email already exists.",});
      }
    
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        name,
        email,
        password : hashPassword,
      });
  
      const savedUser = await newUser.save();
  

      // sign the token
      const token = jwt.sign(
        {
          user: savedUser._id,
          userEmail : savedUser.email
        },
        process.env.JWT_SECRET
      );
  
      // send the token in a HTTP-only cookie
      res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
    
    return res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
      console.log(err);
      res.status(500).json({errorMessage : "Somthing went worng !!!"});
    }

  };




 const login =  async (req,res)=>{

    try {

        const { email, password } = req.body;

        if (!email || !password){
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser){
            return res.status(401).json({ errorMessage: "Wrong email or password." });
        }
    
        const correntPassword = await bcrypt.compare(password, existingUser.password);

        if (!correntPassword)
          return res.status(401).json({ errorMessage: "Wrong email or password." });
    
        // sign the token
        const token = jwt.sign(
          {
            user: existingUser._id,
            userEmail : existingUser.email
          },
          process.env.JWT_SECRET
        );
    
        // send the token in a HTTP-only cookie
    
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
        
        return res.status(201).json({ message: 'User login successfully' , token });

      } catch (err) {
        console.error(err);
        res.status(500).json({errorMessage : "Somthing went worng !!!"});
      }
    };


    
const logout =  (req, res) => {

      res.cookie("token", "", {
          httpOnly: true,
          expires: new Date(0),
          secure: true,
          sameSite: "none",
        });
     
    return res.status(201).json({ message: 'User logout successfully' }); 
  }


 const loggedIn = async (req, res) => {
 
  try {
      const token = req.headers.authorization;
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.JWT_SECRET);
  
      res.send(true);

    } catch (err) {
      res.json(false);
    }
  };


  module.exports = {
    register,login,logout, loggedIn
  }