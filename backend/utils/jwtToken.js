/**
 * Create a JWT Token, store it in a cookie and return it.
 * 
 * @param {Document} user 
 * @param statusCode 
 * @param {HTTP} res 
 * 
 * @return a json web token stored in a cookie.
 */
const sendJWTToken = (user, statusCode, res) => { 
    const token = user.getJWTToken();

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 3600 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, cookieOptions).json({
        success: true,
        user,
        token
    });
}

module.exports = sendJWTToken;