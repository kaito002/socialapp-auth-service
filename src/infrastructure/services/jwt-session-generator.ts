import {SessionGenerator} from "../../domain/services/session-generator";

export class JwtSessionGenerator implements SessionGenerator {
    createFor(userId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    createRefreshSession(userId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}
