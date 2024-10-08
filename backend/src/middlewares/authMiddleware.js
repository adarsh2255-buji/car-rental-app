import jwt from 'jsonwebtoken'
import User from "../model/userModel.js";

//token verification middleware
const protect = async(req, res, next) =>{
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the header
            token = req.headers.authorization.split(' ')[1];
            // console.log('Received Token:', token);

            // Verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log('Decoded:', decode);
            
            // Get user from token
            req.user = await User.findById(decode.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};


//admin middleware
export const adminMiddleware = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else{
        res.status(403).json({ message : "Access denied"})
    }
}
export default protect; 