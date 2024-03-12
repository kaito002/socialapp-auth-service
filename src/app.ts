import Express from "express";
import {createRoutes} from "./routes";

const createServer = () => {
    const app = Express()

    app.use(Express.json())

    app.use(createRoutes())

    console.log(process.env)

    return app
}

export {createServer}
