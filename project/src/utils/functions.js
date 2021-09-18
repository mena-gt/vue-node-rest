
const checkStringPattern = (string) => {
    let pattern = /\w(,\w)*$/
    return pattern.test (string);
}

const stringToArray = (string) => {
    let arr = raw_tags.split (',');
    return arr.map ((item) => item.trim ());
}

const objectToString = (fromObject) => {
    let toString = "";
    Object.keys (fromObject).forEach (function (key) {
        toString += `${key}=${fromObject[key]};`;
    });
    return toString.slice (0, -1);
}

const hasKeys = (obj) => {
    return !!Object.keys (obj).length;
}

module.exports = {
    checkStringPattern,
    stringToArray,
    objectToString,
    hasKeys
};