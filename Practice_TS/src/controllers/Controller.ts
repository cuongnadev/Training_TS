export abstract class Controller {
    abstract fetchData(initContent: () => void): void;
}