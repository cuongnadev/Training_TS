import { CreateElement } from "~/views/components";

export class Form {
    form: HTMLFormElement;

    constructor(className: string) {
        this.form = CreateElement('form', className);
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    }

    /**
     *
     * @param {Function} action
     */
    onSubmit(action: () => void) {
        this.form.addEventListener('submit', () => {
            action();
        });
    }

    render() {
        return this.form;
    }
}