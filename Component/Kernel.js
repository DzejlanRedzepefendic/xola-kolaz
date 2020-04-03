import { Container } from "./Container";
import { ParameterBag } from "./ParameterBag";
import { ContainerBuilder } from "./ContainerBuilder";
import { RouteCollectionBuilder } from "./RouteCollectionBuilder";
import { ControllerResolver } from "./ControllerResolver";

export class Kernel {
    constructor(parameterBag) {
        this.parametersBag = parameterBag || new ParameterBag();
        this.bundles = {};

        this.initializeBundles();
        this.initializeContainer();
        this.initializeRoutes();
    }

    initializeBundles() {
        this.registerBundles().forEach((bundle) => {
            this.bundles[bundle.constructor.name] = bundle;
        });
    }

    initializeContainer() {
        this.container = new Container(this.parametersBag);
        this.container.set("kernel", this);
        this.container.set("params", this.parametersBag);
        this.container.set("controller", new ControllerResolver(this.container));

        let containerBuilder = new ContainerBuilder(this.container);

        for (let name in this.bundles) {
            this.bundles[name].setContainer(this.container);
            this.bundles[name].configureContainer(containerBuilder);
        }

        this.configureContainer(containerBuilder);
    }

    initializeRoutes() {
        let routeCollectionBuilder = new RouteCollectionBuilder();

        this.configureRoutes(routeCollectionBuilder);

        for (let name in this.bundles) {
            this.bundles[name].configureRoutes(routeCollectionBuilder);
        }

        let router = this.container.get("router");
        routeCollectionBuilder.routes.forEach((route) => {
            router.registerRoute(route);
        });
    }

    /**
     * @returns Bundle[]
     */
    registerBundles() {
        return [];
    }

    configureContainer(containerBuilder) {}

    configureRoutes(routeCollectionBuilder) {}
}