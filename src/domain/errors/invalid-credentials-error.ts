
export default class InvalidCredentialsError extends Error {
    constructor(username: string) {
        super(`Invalid credentials for username: ${username}`);
    }
}
