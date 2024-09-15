import { user } from "../schema/user.schema.js";
import bcryptjs from "bcryptjs"
import { generateTokensAndSetCookie } from "../utils/generateToken.js";
export const signUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if all fields are provided
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const existingUserByEmail = await user.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Check if username already exists
    const existingUserByUsername = await user.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // Random profile image assignment
   //  const profile_pic = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
   //  const image = profile_pic[Math.floor(Math.random() * profile_pic.length)];

    // Create new user
    const NewUser = new user({
      email,
      password: hashedPassword,
      username,
      // image
    });
    generateTokensAndSetCookie(NewUser._id, res);

    await NewUser.save();
   
    return res.status(201).json({ 
      success: true, 
      user: {
        ...NewUser._doc, // Corrected from _docs to _doc
        password: ""    // Masking the password in the response
      } 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const logIn = async (req, res) => {
    try {
      const  { email, password } = req.body;
      if(!email || !password){
         return res.status(400).json({ success: false, message: "Email and password are required"})
      }
      const UserData = await user.findOne({email:email})
      if(!UserData){
         return res.status(400).json({ success: false, message: "Invalid email or password" })
         }
         const isValidPassword = await bcryptjs.compare(password, UserData.password);
         if(!isValidPassword){
            return res.status(400).json({ success: false, message: "Invalid password" })
         }
         generateTokensAndSetCookie(UserData._id, res);
         return res.status(200).json({ success: true, user: { ...UserData._doc, password:""} });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
}
export const logOut = async (req, res) => {
   try {
       res.clearCookie("jwt-netflix")
       res.status(200).json({ success: true, message: "Logged out successfully"})
   } catch (error) {
      console.log("error in logout", error.message)
      res.status(500).json({success:false,message:"internal server error"})
   }
}
