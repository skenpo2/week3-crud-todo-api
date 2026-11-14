    const logRequest = (req, res, next) => {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} - ${req.method} ${req.url} from ${req.ip}`);
        next();
    };

    module.exports = logRequest;
