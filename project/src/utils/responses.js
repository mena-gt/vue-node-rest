
class CustomResponse {
    constructor (message, data) {
        this.message = message;
        this.data = data;
    }

    statusCode () {
        if (this instanceof NoContent) return 204;
        return 200;
    }

    toJson () {
        return {
            success: true,
            message: this.message,
            data: this.data
        }
    }
}

class SuccessOk extends CustomResponse {}
class NoContent extends CustomResponse {}

module.exports = {
    SuccessOk,
    NoContent
};