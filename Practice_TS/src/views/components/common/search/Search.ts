import { searchIcon, EventEmitter } from "~/constants";
import { Component, Button, Input } from "~/views/components";

export class Search extends Component {
    searchInput!: Input;
    searchIcon!: Button;
    eventEmitter: EventEmitter;
    constructor() {
        super('search_container d-flex items-center');
        this.eventEmitter = new EventEmitter();
        this.initContent();
    }

    protected initContent(): void {
        this.searchInput = new Input(
            {
                placeholder: 'Search here...',
                type: 'text',
                oninput: (e: Event) => {
                    const input = e.target as HTMLInputElement;
                    this.eventEmitter.emit('search', input.value); // Kích hoạt sự kiện 'search'
                },
            },
            'search_input',
        );
        this.searchIcon = new Button(
            null,
            searchIcon,
            null,
            'icon',
            'md',
            'action_btn search',
            'active',
            () => {},
        );
        this.container.append(this.searchIcon.render(), this.searchInput.render());
    }
    render() {
        return this.container;
    }
}