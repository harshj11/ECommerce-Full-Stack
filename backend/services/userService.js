const User = require('../model/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendJWTToken = require('../utils/jwtToken');

class UserService {

    /**
     * Persit the new user into the database.
     * 
     * @param {HTTP} req, a request object, body of which will be having new user details.
     * @param {HTTP} res
     * @param {function} next
     * 
     * @return an appropriate success response having user details, if user created successfully
     * or an appropriate failure response, if any error occurs.
     */
    static createUser = async (req, res, next) =>  {
        
        const { name, email, password } = req.body;
        
        /*
            Persist user in db, if any error occurs while saving, send appropriate response. The error
            handling would be done at the place wherever this function would actually be called.
        */
        const user = await User.create({ 
            name, email, password,
            avatar: {
                public_id: "Sample Public Id",
                url: "Profile Picture URL"
            }
        });

        //Otherwise generate the token return success response.
        sendJWTToken(user, 201, res);
    }

    /**
     * Login User.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return an appropriate success response having user details, if user logged in successfully
     * or an appropriate failure response, if any error occurs.
     */
    static loginUser = async (req, res, next) => {

        const { email, password } = req.body;

        //Checking if user has provided email and password both.
        if(!email || !password)
            return next(new ErrorHandler(400, "Please enter Email and Password"));
        
        //Check if the provided email exists.
        const foundUser = await User.findOne({ email }).select("+password");

        if(!foundUser)
            return next(new ErrorHandler(401, "Invalid credentials! Please try again"));
        
        //Check if the entered password is correct or not.
        const isPasswordMatched = await foundUser.comparePassword(password);
        
        if(!isPasswordMatched)
            return next(new ErrorHandler(401, "Invalid credentials, Please try again"));
        
        //Otherwise return success response
        return sendJWTToken(foundUser, 200, res);
    }

    /**
     * Logout User.
     * 
     * @param {HTTP} req 
     * @param {HTTP} res 
     * @param {function} next 
     * 
     * @return 
     */
    static logoutUser = async (req, res, next) => {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });
    }
}

module.exports = UserService;