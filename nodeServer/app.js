const express = require('express');
// const RateLimit = require('express-rate-limit');
const dynamicRateLimiter = require('./Utils/RateLimiter')
const path = require('path');
const bodyParserx = require('body-parser');
const app = express();

app.use(express.json());


//// DEMO start
// // Apply the dynamic rate limiter middleware to specific routes or all routes
// app.use('/api/', dynamicRateLimiter(6)); // Apply to all routes under /api/ with a limit of 6
// // or
// // Apply rate limiter middleware to specific routes with different limits
// app.use('/api/limited1', dynamicRateLimiter(10)); // Apply rate limiting with limit of 10 requests per minute for API1
// app.use('/api/limited2', dynamicRateLimiter(20)); // Apply rate limiting with limit of 20 requests per minute for API2
// app.use('/api/unlimited', dynamicRateLimiter(null)); // Exclude rate limiting for API3

// // Define your routes
// app.get('/api/limited1/resource', (req, res) => {
//     res.send('API1 Resource');
// });

// app.get('/api/limited2/resource', (req, res) => {
//     res.send('API2 Resource');
// });

// app.get('/api/unlimited/resource', (req, res) => {
//     res.send('API3 Resource');
// });
//// DEMO start


app.use('/api/', dynamicRateLimiter(20)); // Apply rate limiter middleware

const ejs = require('ejs');
app.set('view engine', 'ejs');

const cors = require('cors');
app.use(cors());
app.use(bodyParserx.json());

// Require routers
const authRouter = require('./Routes/authrouter');
const usercvRouter = require('./Routes/supportcvroutes');

const logger = function(req, res, next){
    next();
};

const requestedAt = function(req, res, next){
    req.requestedAt = new Date().toISOString();
    next();
};

app.use(express.static('./public'));
app.use(requestedAt);

// USING THE ROUTES
app.use('/api/v1/users', authRouter); // Mounting user/auth route
app.use('/api/v1/supportscv', usercvRouter); // Mounting supportcv route

app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the "public" directory (React build files).
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Lets us access static files in the upload folder

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
