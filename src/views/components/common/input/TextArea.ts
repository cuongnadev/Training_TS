import { CreateElement } from "../../core";

export class TextArea {
    private textArea: HTMLTextAreaElement;

    /**
     * @constructor
     * @param options Options for configuring the text area.
     * @param className Additional class names to be applied to the text area.
     */
    constructor(options: Partial<HTMLTextAreaElement> = {}, ...className: string[]) {
        this.textArea = CreateElement('textarea', 'input input-textarea');
        this.textArea.classList.add(...className);

        Object.keys(options).forEach((key) => {
            const value = options[key as keyof HTMLTextAreaElement];
            if (value !== undefined) {
                (this.textArea as any)[key] = value;
            }
        });

        // if rows is not provided, make text area full of container width
        if (!options.rows) {
            this.textArea.classList.add('h-full');
        }
    }

    render(): HTMLTextAreaElement {
        return this.textArea;
    }
}
