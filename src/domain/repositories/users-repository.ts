import {User} from "../models/user";

export default interface UsersRepository {
    findBy(username: string, password: string): Promise<User|null>
}
