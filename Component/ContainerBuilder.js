export class ContainerBuilder {
    constructor(container) {
        this.container = container
    }

    add(serviceName, serviceClass, dependencies = []) {
        let services = [];
        dependencies.forEach(function(name) {
            services.push(this.container[name]);
        }.bind(this));
        this.container.set(serviceName, new serviceClass(...services));
    }
}