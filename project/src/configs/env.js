const dotEnv = require ('dotenv');
const path = require ('path');


const envDir = 'env';

const enviroments = {
    'development': '.develop',
    'production': '.production'
};

const currentEnv = process.env.NODE_ENV || 'development';

const envFile = enviroments[currentEnv];

const filepath = `${path.join (process.cwd (), envDir, envFile)}`;

let result = dotEnv.config ({
    path: filepath
});

if (result.error) {
    throw Error (`The "${filepath}" file not found!`);
}

module.exports = {
    environment:  currentEnv,
    secretKey: process.env.SECRET_KEY
};