export class Response {
    constructor(content, status = 200, headers = {}) {
        this.content = content;
        this.status = status;
        this.headers = headers;
    }
}