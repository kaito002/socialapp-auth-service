import {Error} from "sequelize";


export class DependencyNotFoundError extends Error {
    constructor(name: string) {
        super(`Dependency [${name}] not found`);
    }
}
