import {DependencyNotFoundError} from "./dependency-not-found-error";

export class ActionsLocator {
    private static _instance: ActionsLocator;
    private actions: Map<string, any> = new Map<string, any>()

    static instance(): ActionsLocator {
        if (!Boolean(this._instance)) {
            this._instance = new ActionsLocator()
        }

        return this._instance
    }

    register<T>(name: string, action: T): void {
        this.actions.set(name, action)
    }

    get<T>(name: string): T {
        if (this.actions.has(name)) {
            return this.actions.get(name) as T
        }

        throw new DependencyNotFoundError(name)
    }
}
