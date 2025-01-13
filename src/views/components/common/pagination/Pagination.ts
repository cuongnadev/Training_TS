import { dropdownIcon } from "../../../../constants";
import { Component, CreateElement } from "../../core";
import { Button } from "../button";

export class Pagination extends Component {
    startPage: number = 1;
    currentPage = 1;
    startItem: number;
    itemsPerPage: number;
    totalItems: number;

    title!: HTMLParagraphElement;
    actions!: HTMLDivElement;
    dropdownLeft!: Button;
    dropdownRight!: Button;
    pageButtonsContainer!: HTMLDivElement;

    constructor(startItem: number, itemsPerPage: number, totalItems: number) {
        super('pagination_container d-flex items-center justify-between');
        this.startItem = startItem;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;

        this.initContent();
    }
    protected initContent(): void {
        // Title
        this.title = CreateElement('p', 'pagination_title');
        this.setTitle(this.startItem, this.totalItems);

        // Dropdown Left
        this.dropdownLeft = new Button(
            null,
            dropdownIcon,
            null,
            'icon',
            'md',
            'dropdown-left',
            'active',
            () => this.changePage(this.currentPage - 1),
        );

        // Page Buttons Container
        this.pageButtonsContainer = CreateElement('div', 'd-flex items-center gap-4');

        // Dropdown Right
        this.dropdownRight = new Button(
            null,
            null,
            dropdownIcon,
            'icon',
            'md',
            'dropdown-right',
            'active',
            () => this.changePage(this.currentPage + 1),
        );

        // Actions
        this.actions = CreateElement('div', 'pagination_actions d-flex items-center gap-4', [this.dropdownLeft.render(), this.pageButtonsContainer, this.dropdownRight.render()]);

        this.updatePageButtons(this.startPage);

        this.container.append(this.title, this.actions);
    }

    updatePageButtons(startPage: number): void {
        let endPage = startPage + 3;
        this.pageButtonsContainer.innerHTML = '';

        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
        // Adjust `endPage` to not exceed `totalPages`
        endPage = Math.min(endPage, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = new Button(
                i.toString(),
                null,
                null,
                this.currentPage === i ? 'filled' : 'outlined',
                'md',
                `page-button ${this.currentPage === i ? 'filled' : 'outline'}`,
                'active',
                () => this.changePage(i),
            );
            this.pageButtonsContainer.append(pageButton.render());
        }
        this.setTitle(this.startItem, this.totalItems);
    }

    changePage(newPage: number): void {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        if (newPage < 1 || newPage > totalPages) return;
        
        this.currentPage = newPage;
        this.startItem = (this.currentPage - 1) * this.itemsPerPage;
        this.handlePageChange(this.startItem);

        const maxVisiblePages = 4; // Number of visible pages
        const visibleRangeStart = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));

        this.updatePageButtons(visibleRangeStart);
    }

    setTitle(startItem: number, totalItems: number): void {
        const endItem = startItem + this.itemsPerPage - 1;
        this.title.innerHTML = `Showing <span>${startItem}-${endItem < totalItems ? endItem : totalItems}</span> from <span>${totalItems}</span> data`;
    }

    handlePageChange(newPage: number): void {
        console.log(`Page changed to: ${newPage}`);
    }

    render(): HTMLDivElement {
        return this.container;
    }
}
