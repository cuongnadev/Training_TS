import { Component, CreateElement } from "~/views/components";

export class OverviewItem extends Component {
    private icon!: HTMLSpanElement;
    private title!: HTMLParagraphElement;
    private quantity!: HTMLSpanElement;
    private content!: HTMLSpanElement;

    constructor() {
        super("overview_item d-flex items-center gap-3");
    }

    /**
     * Initialize content of the OverviewItem.
     * @param {string} icon - HTML or SVG for the icon.
     * @param {string} title - The title text.
     * @param {string} quantity - The quantity text.
     */
    protected initContent(icon: string, title: string, quantity: number): void {
        // Validate inputs
        if (typeof icon !== "string" || typeof title !== "string" || typeof quantity !== "number") {
            throw new Error("Invalid input parameters");
        }

        // Create and assign elements
        this.icon = CreateElement("span", "overview_item-icon d-flex items-center justify-center");
        this.icon.innerHTML = icon;

        this.title = CreateElement("p", "overview_item-title");
        this.title.innerText = title;

        this.quantity = CreateElement("span", "overview_item-quantity");
        this.quantity.innerText = quantity.toString();

        this.content = CreateElement("span", "overview_item-content", [this.title, this.quantity]);

        // Append children to the container
        this.container.innerHTML = ""; // Clear previous content
        this.container.append(this.icon, this.content);
    }

    /**
     * Render the OverviewItem.
     * @param {string} icon - SVG for the icon.
     * @param {string} title - The title text.
     * @param {string} quantity - The quantity text.
     * @param {string[]} classname - Additional CSS classes to add.
     * @returns {HTMLDivElement} - The rendered OverviewItem element.
     */
    render(icon: string, title: string, quantity: number, classname: string[] = []): HTMLDivElement {
        try {
            this.initContent(icon, title, quantity);

            // Add additional classes if provided
            if (classname.length > 0) {
                this.container.classList.add(...classname);
            }
        } catch (error) {
            console.error("Error rendering OverviewItem:", error);
        }

        return this.container;
    }
}
