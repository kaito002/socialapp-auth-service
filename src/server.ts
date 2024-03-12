import {createServer} from "./app";
import pino from "pino";
import {registerServices} from "./services";
import {registerActions} from "./actions";

const logger = pino()

const onReadyServer = () => createServer().listen(process.env.PORT, () => {
    logger.info(`Server is running on port: ${process.env.PORT}`)
})

registerServices()
    .then(_ => registerActions())
    .then(_ => onReadyServer())
