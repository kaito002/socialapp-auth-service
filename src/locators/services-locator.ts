import {DependencyNotFoundError} from "./dependency-not-found-error";

export class ServicesLocator {
    private static _instance: ServicesLocator
    private services: Map<string, any> = new Map<string, any>()

    static instance(): ServicesLocator {
        if (!Boolean(this._instance)) {
            this._instance = new ServicesLocator()
        }

        return this._instance
    }

    register<T>(name: string, instance: T): void {
        this.services.set(name, instance)
    }


    get<T>(name: string): T {
        if (this.services.has(name)) {
            return this.services.get(name) as T
        }

        throw new DependencyNotFoundError(name)
    }
}
