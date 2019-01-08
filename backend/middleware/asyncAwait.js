function asyncAwaitMiddleware(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (error) {
            console.log(error);
            next(error);
        } 
    }
}

module.exports = asyncAwaitMiddleware;