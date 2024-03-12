import request from "supertest";

import {createServer} from "../../src/app";
import {LoginAction} from "../../src/domain/actions/login";
import {Mock} from "moq.ts";
import {ActionsLocator} from "../../src/locators/actions-locator";


const mockLoginAction = new Mock<LoginAction>()
let server: any
let loginAction: LoginAction

beforeEach(() => {
    loginAction = mockLoginAction.object()
    ActionsLocator.instance().register<LoginAction>("LoginAction", loginAction)
    server = createServer().listen()
})
afterEach(() => server.close())

describe("POST /auth/login", () => {
    test("should exists", async () => {

        const response = await request(server).post("/auth/login")

        expect(response.statusCode != 404).toBeTruthy()
    })

    test("should fail when username is not defined", async () => {

        const payload = {}
        const response = await request(server).post('/auth/login').send(payload)
        expect(response.statusCode).toBe(400)
    })

    test("should fail when password is not defined", async () => {

        const payload = {
            "username": "username"
        }
        const response = await request(server).post('/auth/login').send(payload)
        expect(response.statusCode).toBe(400)
    })

    test("should return success on login", async () => {

        const payload = {
            "username": "username",
            "password": "password"
        }
        const response = await request(server).post('/auth/login').send(payload)
        expect(response.statusCode).toBe(200)
    })
})
