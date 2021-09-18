const { BadRequest, NotFound } = require ('../../utils').errors;
const { query } = require ('../../sqldb');
const { SuccessOk } = require ('../../utils').responses;
const { checkStringPattern, stringToArray } = require ('../../utils').functions;


const saveNewMessage = async (req, res, next) => {
    try {
        raw_tags = req.body.tags;
        const dTO = {
            msg: req.body.msg
        };
        
        if (!checkStringPattern (raw_tags)) {
            throw new BadRequest ('400 Bad Request', '');
        }

        dTO.tags = stringToArray (raw_tags);
        const id = await query.insertNewMessage (dTO);

        const result = new SuccessOk ('200 Ok', {id: id});

        return res
            .status (result.statusCode ())
            .json (result.toJson ());
    } catch (error) {
        next (error);
    }
}

const fetchMessageByID = async (req, res, next) => {
    try {
        const dTO = {
            id: Number (req.params.id)
        };

        const message = query.selectOnlyMessageByID (dTO);
        if (!message) {
            throw new NotFound ('404 Not Found', '');
        }

        const result = new SuccessOk ('200 Ok', {message: message});

        return res
            .status (result.statusCode ())
            .json (result.toJson ());
    } catch (error) {
        next (error);
    }
}

const fetchMessagesByTag = async (req, res, next) => {
    try {
        const dTO = {
            tag: req.params.tag
        };

        const messages = query.selectMessagesByTag (dTO);
        if (messages instanceof Array && messages.length === 0) {
            throw new NotFound ('404 Not Found', '');
        }

        const result = new SuccessOk ('200 Ok', {messages: messages});

        return res
            .status (result.statusCode ())
            .json (result.toJson ());

    } catch (error) {
        next (error);
    }
}


module.exports = {
    saveNewMessage,
    fetchMessageByID,
    fetchMessagesByTag
};