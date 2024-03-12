import Express from "express";
import {createRoutes} from "./routes";

const createServer = () => {
    const app = Express()

    app.use(Express.json())

    app.use(createRoutes())

    return app
}

export {createServer}
