import { CreateElement } from "../../components";

export default class LoginLayout {
    private appElement: HTMLElement;

    private container: HTMLDivElement;

    constructor(rootApp: HTMLElement) {
        this.appElement = rootApp;

        this.container = CreateElement('div', 'login-layout_container');
        this.appElement.appendChild(this.container);
    }

    render(element: HTMLElement): void {
        this.container.appendChild(element);
    }
}
