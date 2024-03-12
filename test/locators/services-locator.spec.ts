import {ServicesLocator} from "../../src/locators/services-locator";
import {Mock} from "moq.ts";
import {DependencyNotFoundError} from "../../src/locators/dependency-not-found-error";

interface MyService {}

describe("Services Locator Test", () => {

    test("should only exist one instance", () => {
        const servicesLocator = ServicesLocator.instance()
        const servicesLocator2 = ServicesLocator.instance()

        expect(servicesLocator).toBe(servicesLocator2)
    })

    test("should allow register services", () => {
        const mockMyService = new Mock<MyService>()
        const service = mockMyService.object()

        ServicesLocator.instance().register<MyService>("MyService", service)

        expect(ServicesLocator.instance().get<MyService>("MyService")).toBe(service)
    })

    test("should return a exception when dependency is not found", () => {

        expect(() => ServicesLocator.instance().get<string>("string")).toThrow(DependencyNotFoundError)
    });
})
