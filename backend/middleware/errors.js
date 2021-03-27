const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    // Passes the error status code or pass it 500 (internal server error) as a default
    err.statusCode = err.statusCode || 500
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.errMessage,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        // Create a cope of the error
        let error = {...err}
        error.message = err.message

        res.status(error.statusCode).json({
            success:false,
            message: error.message || "Internal Server Error"
        })
    }


}