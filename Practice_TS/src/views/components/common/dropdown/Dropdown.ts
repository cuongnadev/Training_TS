import { CreateElement } from "~/views/components";

export class Dropdown {
    private open: boolean;
    private dropdown: HTMLDivElement;
    private trigger!: HTMLElement;
    private content!: HTMLDivElement;

    constructor() {
        this.open = false;
        this.dropdown = CreateElement('div');
        this.dropdown.className = 'dropdown_container hidden';
    }

    init(triggerElement: HTMLElement, dropdownLinks: { href: string; label: string; action: () => void }[]): void {
        // Dropdown Trigger
        this.trigger = triggerElement;
        this.trigger.classList.add('dropdown_trigger');
        (this.trigger as any).dropdownInstance = this; // Attach instance to trigger for static method access

        // Dropdown Content
        this.content = CreateElement('div');
        this.content.className = 'dropdown_content';

        // Dropdown Links
        dropdownLinks.forEach((link) => {
            const dropdownLink = CreateElement('a');
            dropdownLink.href = link.href;
            dropdownLink.className = 'dropdown_link';
            dropdownLink.innerText = link.label;
            this.content.appendChild(dropdownLink);

            dropdownLink.addEventListener('click', (event) => {
                event.preventDefault();
                link.action();
            });
        });

        this.dropdown.appendChild(this.content);
        this.trigger.appendChild(this.dropdown);

        this.trigger.addEventListener('click', this.toggleOpen.bind(this));
    }

    private toggleOpen(event: MouseEvent): void {
        event.stopPropagation();

        if (this.open) {
            this.open = !this.open;
        } else {
            Dropdown.closeAllDropdown();
            this.open = !this.open;
        }

        this.updateDropdownState();

        if (this.open) {
            document.addEventListener('click', this.handleClickOutside.bind(this), { once: true });
        }
    }

    private updateDropdownState(): void {
        if (this.open) {
            this.dropdown.classList.remove('hidden');
        } else {
            this.dropdown.classList.add('hidden');
        }
    }

    private handleClickOutside(event: MouseEvent): void {
        if (this.open && !this.dropdown.contains(event.target as Node)) {
            this.open = false;
            this.updateDropdownState();
        }
    }

    static closeAllDropdown(): void {
        const dropdowns = document.querySelectorAll<HTMLElement>('.dropdown_trigger');
        dropdowns.forEach((trigger) => {
            const instance = (trigger as any).dropdownInstance as Dropdown;
            if (instance && instance.open) {
                instance.open = false;
                instance.updateDropdownState();
            }
        });
    }
}
