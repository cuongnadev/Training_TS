import { CreateElement } from '../../components/core';
import Header from '../components/Header';
import Navigation from '../components/Navigation';

export default class MainLayout {
    private appElement: HTMLElement;

    private container: HTMLDivElement;
    private header: Header;
    private nav: Navigation;

    constructor(rootApp: HTMLElement) {
        this.appElement = rootApp;

        this.container = CreateElement('div', 'main-layout_container d-flex');
        this.appElement.appendChild(this.container);

        this.header = new Header();
        this.nav = new Navigation();
    }

    render(content: HTMLElement): void {
        // Tạo các phần tử DOM cho Header, Nav, Main
        const headerElement = this.header.render();
        const navElement = this.nav.render();
        const mainElement = this.createMainContent(content);
        const contentElement = CreateElement('div', 'main-layout_content d-flex flex-col flex-1', [headerElement, mainElement]);

        // Gắn các phần tử vào ứng dụng
        this.container.innerHTML = '';
        this.container.appendChild(navElement);
        this.container.appendChild(contentElement);
    }

    updateMainContent(content: HTMLElement): void {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = '';
            mainContent.appendChild(content);
        } else {
            console.warn('Main content element not found. Rendering full layout.');
            this.render(content);
        }
    }

    private createMainContent(content: HTMLElement): HTMLElement {
        const mainElement = document.createElement('main');
        mainElement.id = 'main-content';
        mainElement.innerHTML = '';
        mainElement.appendChild(content);
        return mainElement;
    }
}
