import LoginResult from "../results/login-result";
import UsersRepository from "../repositories/users-repository";
import {SessionGenerator} from "../services/session-generator";
import InvalidCredentialsError from "../errors/invalid-credentials-error";

export type LoginAction = (username: string, password: string) => Promise<LoginResult>;

export const Login = (usersRepository: UsersRepository, sessionGenerator: SessionGenerator) =>
    async (username: string, password: string): Promise<LoginResult> => {
        const user = await usersRepository.findBy(username, password)

        if (user == null) {
            throw new InvalidCredentialsError(username)
        }

        const [session, refreshSession] = await Promise.all([sessionGenerator.createFor(user.userId), sessionGenerator.createRefreshSession(user.userId)])

        return Promise.resolve({
            userId: user.userId,
            session: session,
            refreshSession: refreshSession
        })
    }
