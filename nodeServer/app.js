//// INPORT EXPRESS
const express = require('express')
const rateLimiter = require('./Utils/RateLimiter')
const path = require('path')
const bodyParserx = require('body-parser')
let app = express()
app.use(express.json())

//// DEMO start
// // Apply the dynamic rate limiter middleware to specific routes or all routes
// app.use('/api/', rateLimiter(6)); // Apply to all routes under /api/ with a limit of 6
// // or
// // Apply rate limiter middleware to specific routes with different limits
// app.use('/api/limited1', rateLimiter(10)); // Apply rate limiting with limit of 10 requests per minute for API1
// app.use('/api/limited2', rateLimiter(20)); // Apply rate limiting with limit of 20 requests per minute for API2
// app.use('/api/unlimited', rateLimiter(null)); // Exclude rate limiting for API3

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

// app.use('/api/', rateLimiter(6));

//// for templating
const ejs = require('ejs');
app.set('view engine', 'ejs');

//// To support cors and allow us send and recieve data through url we use cors
const cors = require('cors');
app.use(cors()) // allows cross origin scripting
app.use(bodyParserx.json()) 

//// Require routers
const authRouter = require('./Routes/authrouter')
const supportcvRouter = require('./Routes/supportcvroutes')


const logger = function(req, res, next){
    next()
}


const requestedAt = function(req, res, next){
    req.requestedAt = new Date().toISOString()
    next()
}


app.use(express.static('./public'))// for web static files
// app.use(logger) //middleware
app.use(requestedAt) //middleware


// USING THE ROUTES
app.use('/api/v1/users', authRouter)// mounting user/auth route 
app.use('/api/v1/supportscv', supportcvRouter)// mounting supportcv route



app.use(express.static(path.join(__dirname, 'build'))); // Serve static files from the "public" directory (React build files).
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // lets us access static files in the upload folder


// Define a route to serve the "build/index.html" file as the default route
app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//   //DEFAULT ROUTE (for all other routes that are not matched)
//   app.all('*', (r eq, res, next) => {
//       const err = new CustomError(`Can't find ${req.originalUrl}`, 404)
//       next(err); // call the global error handling middleware
//   });

// app.use(globalErrorHandler) 

module.exports = app 