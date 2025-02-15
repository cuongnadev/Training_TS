import router from "~/router/routes";
import { dropdownIcon, EventEmitter, plusIcon } from "~/constants";
import { TypePage, TypePageValues } from "~/types";
import { Component, CreateElement, Button, Search } from "~/views/components";

export class Toolbar extends Component {
    eventEmitter: EventEmitter;
    searchComponent: Search;
    sortBtn: Button;
    createBtn: Button;

    constructor(type: TypePage) {
        super("toolbar_container d-flex items-center justify-between");
        // event emitter
        this.eventEmitter = new EventEmitter();

        // search component
        this.searchComponent = new Search();

        // sort btn
        this.sortBtn = new Button(
            "Newest",
            null,
            dropdownIcon,
            "outlined",
            "md",
            "sort_btn d-flex items-center justify-center gap-2",
            "active",
            () => {},
        );

        // create btn
        this.createBtn = new Button(
            type === TypePageValues.Student ? "New Student" : "New Teacher",
            plusIcon,
            null,
            "filled",
            "md",
            "plus_btn d-flex items-center justify-center gap-2",
            "active",
            () => {
                type === TypePageValues.Student ? router.navigate("/students/add") : router.navigate("/teachers/add");
            },
        );

        this.initContent();
    }
    protected initContent(): void {
        // Lắng nghe sự kiện 'search' từ Search và phát lại
        this.searchComponent.eventEmitter.on("search", (value: string) => {
            this.eventEmitter.emit("search", value);
        });

        // action
        const action = CreateElement("div", "d-flex items-center justify-center gap-4", [
            this.sortBtn.render(),
            this.createBtn.render(),
        ]);

        this.container.append(this.searchComponent.render(), action);
    }

    render() {
        return this.container;
    }
}
