let db = require ('./memory');


const insertCredential = (dTO) => {
    db.credentials.push ({key: dTO.key, sharedSecret: dTO.secret});
}

const selectKey = (dTO) => {
    return db.credentials.find (item => item.key === dTO.key);
}

const insertNewMessage = (dTO) => {
    const new_id = db.data.length > 0 ? db.data[db.data.length-1].id + 1 : 1;
    db.data.push ({id: new_id, msg: dTO.msg, tags: dTO.tags });
    return new_id;
}

const selectOnlyMessageByID = (dTO) => {
    const message = db.data.find ((item) => { return item.id === dTO.id });
    return message ? message.msg : undefined;
}

const selectMessagesByTag = (dTO) => {
    return db.data
        .filter ((item) => item.tags.includes (dTO.tag))
        .map ((subitem) => {
            return { msg: subitem.msg, tag: dTO.tag };
        });
}

module.exports = {
    insertNewMessage,
    insertCredential,
    selectKey,
    selectOnlyMessageByID,
    selectMessagesByTag
};