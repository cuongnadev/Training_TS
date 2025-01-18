import { CreateElement } from "~/views/components";
import { FormAddInputItem } from "./FormAddInputItem";

export class FormAddInputRow {
    container: HTMLDivElement;

    constructor(items: FormAddInputItem[]) {
        this.container = CreateElement("div", "add_form-input-row d-flex flex-col items-start gap-4");
        items.forEach(item => this.container.appendChild(item.render()));
    }

    render(): HTMLDivElement {
        return this.container;
    }
}
