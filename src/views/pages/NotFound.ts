import { NotFoundController } from "../../controllers";
import { CreateElement, PageLayout } from "../components/core";

export default class NotFound extends PageLayout<NotFoundController> {
    constructor() {
        super('not-found_container d-flex items-center justify-center', new NotFoundController());

        this.initData();
    }

    initData() {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }
    
    protected initContent(): void {
        const title = CreateElement('h1', 'not-found_title');
        title.textContent = '404 - Page not Found';

        this.container.appendChild(title);
    }

    render() {
        return this.container;
    }
}