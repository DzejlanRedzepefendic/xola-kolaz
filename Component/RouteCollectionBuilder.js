export class RouteCollectionBuilder {
    constructor() {
        this.routes = []
    }

    add(method, path, handler) {
        this.routes.push({method, path, handler});
    }
}