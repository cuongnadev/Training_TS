import { CreateElement } from "./CreateElement";

export abstract class Component<T extends keyof HTMLElementTagNameMap = keyof Pick<HTMLElementTagNameMap, "div">> {
    container: HTMLElementTagNameMap[T];
    constructor(
        className: string,
        tagName: T = 'div' as T,
        options?: ElementCreationOptions
    ) {
        this.container = CreateElement(tagName, className, [], options);
    }

    /**
     * Initializes content for the component
     * @param props Necessary parameters for the component.
     */
    protected abstract initContent(...props: any[]): void;
    
    /**
     * Renders the component and returns the DOM element.
     */
    abstract render(...props: any[]): HTMLElementTagNameMap[T];
}
