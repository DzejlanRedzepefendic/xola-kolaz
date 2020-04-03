export class Controller {
    setContainer(container) {
        this.container = container;
    }

    get(name) {
        return this.container.get(name);
    }

    getParam(name, defaultValue = null) {
        return this.container.getParam(name, defaultValue);
    }
}