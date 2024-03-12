import {Request, Response} from "express";
import {LoginAction} from "../domain/actions/login";


export const LoginHandler = (loginAction: LoginAction) => (req: Request, res: Response) => {
    const username: string = req.body.username
    const password: string = req.body.password

    if (username == null) {
        return res.status(400).send()
    }

    if (password == null) {
        return res.status(400).send()
    }

    res.send()
}
