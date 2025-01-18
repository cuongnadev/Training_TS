import { CreateElement } from "~/views/components";
import { FormAddInputCol } from "./FormAddInputCol";

export class FormAddInput {
    container: HTMLDivElement;

    constructor(cols: FormAddInputCol[]) {
        this.container = CreateElement("div", "add_form-inputs d-flex items-start justify-start gap-4");
        cols.forEach(col => this.container.appendChild(col.render()));
    }

    render(): HTMLDivElement {
        return this.container;
    }
}
