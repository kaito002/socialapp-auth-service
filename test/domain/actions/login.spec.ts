import {It, Mock, Times} from "moq.ts";

import {Login} from "../../../src/domain/actions/login"
import LoginResult from "../../../src/domain/results/login-result";
import UsersRepository from "../../../src/domain/repositories/users-repository";
import {User} from "../../../src/domain/models/user";
import {SessionGenerator} from "../../../src/domain/services/session-generator";
import InvalidCredentialsError from "../../../src/domain/errors/invalid-credentials-error";
import any = jasmine.any;
import anything = jasmine.anything;

let usersRepository: UsersRepository
let sessionGenerator: SessionGenerator
let MockSessionGenerator: Mock<SessionGenerator>
let MockUserRepository: Mock<UsersRepository>
let action: (username: string, password: string) => Promise<LoginResult>

let username = "username"
let password = "password"

beforeEach(() => {
    MockUserRepository = new Mock<UsersRepository>()
    MockSessionGenerator = new Mock<SessionGenerator>()

    MockUserRepository
        .setup(instance => instance.findBy(username, password))
        .returns(Promise.resolve(new User("userId", new Date(0))))
        .setup(instance => instance.findBy("invalidUserName", It.IsAny()))
        .returns(Promise.resolve(null))

    MockSessionGenerator
        .setup(instance => instance.createFor("userId"))
        .returns(Promise.resolve("session"))
        .setup(instance => instance.createRefreshSession("userId"))
        .returns(Promise.resolve("refreshSession"))

    usersRepository = MockUserRepository.object()
    sessionGenerator = MockSessionGenerator.object()

    action = Login(usersRepository, sessionGenerator)
})

describe("Login Action", () => {
    test("should return a result with session", async () => {
        const result = await action(username, password)

        const expected: LoginResult = {
            userId: "userId",
            session: "session",
            refreshSession: "refreshSession"
        }

        expect(result.userId).toBe(expected.userId)
        expect(result.session).toBe(expected.session)
        expect(result.refreshSession).toBe(expected.refreshSession)
    })

    test("should call repository", async () => {
        await action(username, password)

        MockUserRepository.verify(instance => instance.findBy(username, password), Times.Exactly(1))
    })

    test("should generate a session token", async () => {
        await action(username, password)

        MockSessionGenerator.verify(instance => instance.createFor("userId"), Times.Exactly(1))
    })

    test("should generate a refresh session token", async () => {
        await action(username, password)

        MockSessionGenerator.verify(instance => instance.createRefreshSession("userId"), Times.Exactly(1))
    })

    test("should fail if user is not valid", async () => {
        await expect(async () => await action('invalidUserName', 'randomPassword'))
            .rejects.toThrow(InvalidCredentialsError)
    })
})
