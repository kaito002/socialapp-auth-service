
export interface SessionGenerator {
    createFor(userId: string): Promise<string>
    createRefreshSession(userId: string): Promise<string>
}
