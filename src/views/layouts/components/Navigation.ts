import { Component } from "../../components/core";

export default class Navigation extends Component {
    
    constructor() {
        super('nav_container');

        this.initContent();
    }

    protected initContent(): void {
        this.container.innerHTML = `
            <nav>
                <a href="/" data-router>Dashboard</a>
                <a href="/students" data-router>Student</a>
                <a href="/teachers" data-router>Teacher</a>
            </nav>
        `;
    }
    
    render() {
        return this.container;
    }
}

