let DATE = new Date();
let YY = DATE.getFullYear();
let HOST = '';

if (process.env.NODE_ENV === "development") {
    HOST = process.env.DEV_HOST;
} else if (process.env.TestingForProduction === "true" && process.env.NODE_ENV === "production") {
    HOST = process.env.PROD_HOST;
} else {
    HOST = process.env.PROD_HOST;
}

module.exports = { DATE, YY, HOST };
