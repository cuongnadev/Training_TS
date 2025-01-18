import { Component, CreateElement } from "~/views/components";
import { HeaderActions } from "./HeaderAction";

export default class Header extends Component {
    title!: HTMLHeadingElement;
    headerAction!: HeaderActions;

    constructor() {
        super('header_container d-flex items-center justify-between');

        this.initContent();
    }

    protected initContent(): void {
        this.title = CreateElement('h1', 'header_title');

        this.headerAction = new HeaderActions();

        this.container.append(this.title, this.headerAction.render());
    }

    updateNamePage(name: string): void {
        this.title.innerText = "";
        this.title.innerText = name;
    }

    render(title: string) {
        this.title.innerText = title;
        return this.container;
    }
}
