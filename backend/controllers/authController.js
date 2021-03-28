const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async(req, res, next) => {

    // destructure name email and password 
    const { name, email, password} = req.body

    const user = await User.create({
        name, 
        email, 
        password,
        avatar: {
            public_id: 'bear/12345',
            url: 'https://placebear.com/300/300'
        }
    })

    const token = user.getJwToken()

    res.status(201).json({
        success: true,
        token
    })
})