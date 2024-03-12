import {SequelizeProvider} from "./sequelize-provider";
import {DataTypes} from "sequelize";


export const UserSequelize = SequelizeProvider.getSequelize().define('User', {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
});
