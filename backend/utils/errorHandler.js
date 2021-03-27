// Error handler class

class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode

        // Create a .stack property on the object
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler