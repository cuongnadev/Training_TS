import { CreateElement } from "~/views/components";

export class InputLabel {
    inputLabel: HTMLLabelElement;

    constructor(
        value: string | undefined, 
        className: string = '', 
        props?: ElementCreationOptions,
        ...children: string[]
    ) {
        // Tạo phần tử <label>
        this.inputLabel = CreateElement('label', className, children, props);

        // Nếu có giá trị "value", sử dụng nó làm nội dung
        if (value) {
            this.inputLabel.textContent = value;
        }
    }

    render() {
        return this.inputLabel;
    }
}