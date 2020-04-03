export class Container {
    constructor(parameterBag) {
        this.parameters = parameterBag;
    }

    getParam(name, defaultValue = null) {
        return this.parameters.has(name) ? this.parameters.get(name) : defaultValue;
    }

    get(name) {
        return this[name];
    }

    set(name, service) {
        this[name] = service;
    }
}