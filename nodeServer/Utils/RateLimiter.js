const RateLimit = require('express-rate-limit');

// Function to calculate the rate limit dynamically based on the provided limit
function calculateRateLimit(limit) {
    // Your logic to calculate the rate limit dynamically
    const dynamicLimit = limit; // Use the provided limit
    return dynamicLimit;
}

// Create a rate limiter middleware with dynamic limit
const RateLimiter = (limit) => {
    return (req, res, next) => {
        const dynamicLimit = calculateRateLimit(limit);
        const rateLimitMiddleware = new RateLimit({
            windowMs: 60 * 1000, // 1 minute window
            max: dynamicLimit, // dynamically calculated limit
            message: "Too many requests from this IP, please try again later",
            headers: true, // send custom rate limit header
        });
        rateLimitMiddleware(req, res, next);
    };
};

module.exports = RateLimiter;
