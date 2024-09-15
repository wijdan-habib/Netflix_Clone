import jwt from 'jsonwebtoken';
import { user } from '../schema/user.schema.js';
import { ENV_VARS } from '../config/enVars.js';

export const protectedRoute = async (req, res, next) => {
  try {
    // Access the token from cookies (it's an object, not a function)
    const token = req.cookies['jwt-netflix'];
    
    // If token is not present, return unauthorized
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized login" });
    }

    // Verify the token using JWT secret
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Token verification failed" });
    }

    // Find the user based on the decoded userId from the token
    const foundUser = await user.findById(decoded.userId).select("-password");
    
    if (!foundUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach the user to the request object
    req.user = foundUser;
    
    // Proceed to the next middleware
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware: " + error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
