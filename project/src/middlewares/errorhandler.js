const { CustomError } = require ('../utils').errors;


const handler = (error, req, res, next) => {
    if (error instanceof CustomError) {
        return res
            .status (error.statusCode ())
            .json (error.toJson ());
    } 
    else {
        console.log (error.stack);
        return res.status (500)
            .json ({
                success: false,
                message: error.message
            });
    }
};

module.exports = {
    handler
}