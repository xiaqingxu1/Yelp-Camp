class ExpressError extends Error {
    constructor(message, StatusCode) {
        super();
        this.message = message;
        this.statusCode = StatusCode;
    }
}

module.exports = ExpressError