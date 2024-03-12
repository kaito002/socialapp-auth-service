import {User} from "../../../src/domain/models/user";

describe("User Model Test", () => {
    test("should create a user", () => {
        const user = new User("id", new Date(0))
        expect(user.userId).toBe("id")
        expect(user.createdAt.getTime()).toBe(new Date(0).getTime())
    })
})
