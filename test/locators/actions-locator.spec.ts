import {ActionsLocator} from "../../src/locators/actions-locator";
import {DependencyNotFoundError} from "../../src/locators/dependency-not-found-error";


type MyActionType = (param: string) => {}

describe("Actions Locator Test", () => {

    test("should have only one instance", () => {
        const actionsLocator = ActionsLocator.instance()
        const actionsLocator2 = ActionsLocator.instance()

        expect(actionsLocator).toBe(actionsLocator2)
    })

    test("should register actions", () => {
        const action: MyActionType = () => (param: string) => {
        }

        ActionsLocator.instance().register<MyActionType>("MyActionType", action)

        expect(ActionsLocator.instance().get<MyActionType>("MyActionType")).toBe(action)
    })

    test("should return a exception when dependency is not found", () => {

        expect(() => ActionsLocator.instance().get<string>("string")).toThrow(DependencyNotFoundError)
    });
})
