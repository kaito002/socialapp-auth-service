
export class User {
    private readonly _userId: string
    private readonly _createdAt: Date

    constructor(userId: string, createdAt: Date) {
        this._userId = userId
        this._createdAt = createdAt
    }

    public get userId() : string {
        return this._userId
    }

    public get createdAt(): Date {
        return this._createdAt
    }
}
