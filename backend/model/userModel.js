const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required!"],
        maxLength: [50, "Name cannot exceed 50 characters!"],
        minLength: [4, "Name should have at least 4 characters!"]
    },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email!"]
    },
    password: {
        type: String,
        required: [true, "Password is Required!"],
        minLength: [8, "Password should have at least 8 characters!"],
        select: false
    },      
    avatar: {
        public_id: {
            type: String,
            required: true
        }, 
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//mongoose pre-middleware function
userSchema.pre("save", async function(next) {

    //This would prevent hashing the password if the password haven't been modified.
    if(!this.isModified('password'))
        next();
    
    this.password = await bcrypt.hash(this.password, 12);
});

/**
 * @return JWT token.
 */
userSchema.methods.getJWTToken = function() {
    return jwt.sign(
        { id: this._id }, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );
}

/**
 * Validate the password entered by the user.
 * 
 * @param {string} enteredPassword 
 * 
 * @return true, if password is valid else false.
 */
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);