import { CreateElement } from "../../../components";

export class FormAddInputItem {
    container: HTMLDivElement;

    constructor(content: HTMLElement | HTMLElement[]) {
        this.container = CreateElement("div", "add_form-input-item");
        if (Array.isArray(content)) {
            this.container.append(...content);
        } else {
            this.container.append(content);
        }
    }

    render(): HTMLDivElement {
        return this.container;
    }
}
