import {Router} from 'express'
import {LoginHandler} from "./login-handler";
import {LoginAction} from "../domain/actions/login";
import {ActionsLocator} from "../locators/actions-locator";

const createRoutes = () => {
    const routes = Router()

    routes.post('/auth/login', LoginHandler(ActionsLocator.instance().get<LoginAction>("LoginAction")))

    return routes
}

export {createRoutes}
