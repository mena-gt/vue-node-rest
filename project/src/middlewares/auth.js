const crypto = require ('crypto');

const { Forbidden } = require ('../utils').errors;
const { objectToString, hasKeys } = require ('../utils').functions;
const { query } = require ('../sqldb');




const required = (req, res, next) => {
    try {
        const hashedData = generateSignature (
            req.body,
            req.query, 
            req.originalUrl,
            req.headers['x-key']
        );

        const xSignature = req.headers['x-signature'];
        if (xSignature !== hashedData) {            
            throw new Forbidden ('403 Forbidden', '');
        }

        next ();
    } catch (error) {
        next (error);
    }
}

const generateSignature = (bodyParams, urlParams, xRoute, xKey) => {
        if (!xKey) {
            throw new Forbidden ('403 Forbidden', '');
        }
        
        const credential = query.selectKey ({ key: xKey });
        if (!credential) {
            throw new Forbidden ('403 Forbidden', '');
        }

        let plainString = "";
        if (hasKeys (bodyParams)) {
            plainString += objectToString (bodyParams);
        }

        if (hasKeys (urlParams)) {
            plainString += `;${objectToString (urlParams)}`;
        }
        
        plainString += `;x-route=${xRoute}`;

        const hashedData = crypto
            .createHmac ('sha256', credential.sharedSecret)
            .update (plainString)
            .digest ('hex');
        
        return hashedData;
};

module.exports = {
    required,
    generateSignature
};