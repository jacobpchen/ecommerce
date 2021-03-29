// Create and send token and save it in the cookie
const sendToken = (user, statusCode, res) => {

    // Create jwt token 
    const token = user.getJwToken()

    // Stores the JWT token as a cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken