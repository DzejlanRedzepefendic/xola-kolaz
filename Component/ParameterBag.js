export class ParameterBag {
    constructor(parameters = {}) {
        this.parameters = parameters;

        Object.freeze(this.parameters);
    }
    get(name, defaultValue) {
        return this.parameters.hasOwnProperty(name) ? this.parameters[name] : defaultValue;
    }
}