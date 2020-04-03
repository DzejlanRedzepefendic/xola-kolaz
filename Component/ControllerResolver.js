export class ControllerResolver {
    constructor(container) {
        this.container = container;
    }

    buildHandler(controllerDefinition, mixins) {
        let controller = new controllerDefinition[0]();
        controller.setContainer(this.container);

        Object.assign(controller, mixins);

        return controller[controllerDefinition[1]].bind(controller)
    }
}