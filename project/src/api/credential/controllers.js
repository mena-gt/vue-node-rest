const { query } = require ('../../sqldb');
const { Forbidden } = require ('../../utils').errors;
const { NoContent } = require ('../../utils').responses;


const saveCretential = async (req, res, next) => {
    try {
        const dTO = {
            key: req.body.key,
            secret: req.body.shared_secret
        }

        const checkIfAKeyExists = query.selectKey (dTO);

        if (checkIfAKeyExists) {
            throw new Forbidden ('403 Forbidden', '');
        } 

        query.insertCredential (dTO);

        const result = new NoContent ();

        return res
            .status (result.statusCode ())
            .json (result.toJson ());

    } catch (error) {
        next (error);
    }
}

module.exports = {
    saveCretential
};