const { environment } = require ('./env.js');


module.exports = {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
};