import {Sequelize} from "sequelize";

export class SequelizeProvider {
    private static sequelize: Sequelize

    static getSequelize(): Sequelize {
        if (this.sequelize == null) {
            this.sequelize = this.createInstance()
        }

        return this.sequelize
    }

    private static createInstance(): Sequelize {
        if (process.env.SERVER_ENV == "test") {
            return new Sequelize('sqlite::memory:')
        }

        return new Sequelize()
    }
}
