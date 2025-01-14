import { CreateElement } from "../../../components";
import { FormAddInputRow } from "./FormAddInputRow";

export class FormAddInputCol {
    container: HTMLDivElement;

    constructor(rows: FormAddInputRow[]) {
        this.container = CreateElement("div", "add_form-input-col d-flex flex-col items-start gap-4");
        rows.forEach(row => this.container.appendChild(row.render()));
    }

    render(): HTMLDivElement {
        return this.container;
    }
}
