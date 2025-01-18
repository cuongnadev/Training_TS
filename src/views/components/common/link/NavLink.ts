import { anchorAttributes } from "~/constants";
import { parsePath } from "~/router";
import { CreateElement } from "~/views/components";

export class NavLink {
    link: HTMLAnchorElement;
    iconContainer: HTMLElement;
    labelContainer: HTMLElement;
    componentPaths: string[];
    isActive: boolean;

    constructor(icon: string, label: string, to: string, componentPaths: string[] = []) {
        this.componentPaths = componentPaths;

        // Create link element
        this.link = CreateElement('a', 'nav-link_container d-flex items-center justify-start gap-2');
        this.link.href = to;
        this.link.setAttribute(anchorAttributes.navLink, ''); 

        // Create icon element
        this.iconContainer = CreateElement('span', 'nav-link_icon');
        this.iconContainer.innerHTML = icon;

        // Create label element
        this.labelContainer = CreateElement('p', 'nav-link_label');
        this.labelContainer.innerText = label;

        // check active state
        this.isActive = this.checkActive();
        if(this.isActive) {
            this.link.classList.add('active');
        }

        this.link.append(this.iconContainer, this.labelContainer);
    }

    checkActive(): boolean {
        const currentPath = window.location.pathname;
        return this.componentPaths.some((path) => !!(parsePath(currentPath, path)));
    }

    render(): HTMLAnchorElement {
        return this.link;
    }
}