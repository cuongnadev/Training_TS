import { Component, CreateElement } from "../../components/core";

export default class Header extends Component {
    constructor() {
        super('header_container');

        this.initContent();
    }

    protected initContent(): void {
        const h1 = CreateElement('h1');
        h1.textContent = 'My Header Application';

        this.container.appendChild(h1);
    }

    render() {
        return this.container;
    }
}
