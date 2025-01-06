import { Controller } from "../../../controllers";
import { Component } from "./Component";

export abstract class PageLayout<T extends Controller> extends Component {
    constructor(
        className: string,
        protected controller?: T
    ) {
        super(className);
    }

    /**
     * initialize data for layout
     */
    initData() {
        this.container.innerText = '';
    }
}