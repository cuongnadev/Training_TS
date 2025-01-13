import { CreateElement } from "../../core";

export class Input {
    private input: HTMLInputElement;

    /**
     * @param options Object containing properties for the input element.
     * @param className Additional class names to add to the input element.
     */
    constructor(options: Partial<HTMLInputElement> = {}, ...className: string[]) {
        this.input = CreateElement('input', 'input');
        this.input.classList.add(...className);

        Object.keys(options).forEach((key) => {
            const value = options[key as keyof HTMLInputElement];
            if (value !== undefined) {
                (this.input as any)[key] = value;
            }
        });
    }

    render(): HTMLInputElement {
        return this.input;
    }
}
