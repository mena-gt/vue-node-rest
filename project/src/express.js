
const express = require ('express');
const morgan = require ('morgan');
const path = require ('path');

const { environment } = require ('./configs').environment;
const { NotFound } = require ('./utils').errors;
const apiRouter = require ('./api');
const { error } = require ('./middlewares');


const app = express ();

app.use (express.urlencoded ({ extended: true }));
app.use (express.json ());

if ('development' === environment) {
    app.use (
        morgan (
            ':method :url :status :response-time ms - :res[content-length]'
        )
    );
}

const vueDirPath = path.join (__dirname, '..', 'frontend', 'dist');
app.use (express.static (vueDirPath));

/** Routing **/
app.use ('', apiRouter);

app.get ('/', (req,res) => {
    const vuePage = path.join (__dirname, '..', 'frontend', 'dist', 'index.html');
    res.sendFile (vuePage);
});

app.use ('/', function (request, response, next) {
    next (new NotFound ('Page not found!', ''));
});

/** Error-handling middlewares **/
app.use (error.handler);

process.on ('unhandledRejection', (error, promise) => {
    console.log ('Unhandled rejection at: ');
    console.log (promise);
    console.log ('\nReason: ');
    console.log (error);
    process.exit (1);
});

process.on ('uncaughtException', (error) => {
    console.log ('Uncaught Exception: ');
    console.log (error);
    process.exit (1);
});

module.exports = app;