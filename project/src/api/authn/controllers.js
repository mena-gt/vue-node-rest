const crypto = require ('crypto');
const url = require ('url');

const { Forbidden } = require ('../../utils').errors;
const { SuccessOk } = require ('../../utils').responses;
const { generateSignature } = require ('../../middlewares').auth;


function makeCretential (req, res, next) {
    try {
        const parsedUrl =  url.parse (req.headers['x-route'], true);
        const hashedData = generateSignature (
            req.body,
            parsedUrl.query,
            req.headers['x-route'],
            req.headers['x-key']
        );

        const result = new SuccessOk (
            '200 Ok', 
            {'x-signature': hashedData}
        );

        return res.status (result.statusCode ()).
            json (result.toJson ());
    } catch (error) {
        next (error);
    }
}

module.exports = {
    makeCretential
};