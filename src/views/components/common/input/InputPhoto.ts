import { Component, Input } from "~/views/components";

export class InputPhoto extends Component {
    private fileInput!: Input;
    private imageUrl: string | null = null;
    private errorMessage: string = '';
    private onFileSelect!: (file: File) => void;

    constructor(onFileSelect: (file: File) => void, className: string = "") {
        super(`input-photo ${className}`);
        this.container.addEventListener("drop", this.handleDrop.bind(this));
        this.container.addEventListener("dragover", (e) => e.preventDefault());
        this.container.addEventListener("click", this.handleClick.bind(this));
        this.onFileSelect = onFileSelect;

        this.initContent();
    }

    protected initContent(): void {
        this.fileInput = new Input(
             {
                type: "file",
                name: "photo",
                placeholder: "Drop or click to select a photo",
                accept: "image/*",
                onchange: this.handleFileChange.bind(this)
            },
            "hidden"
        );

        this.updateDisplay();
    }

    private handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const file = target.files ? target.files[0] : null;
        if (file && file.type.startsWith("image/")) {
            this.imageUrl = URL.createObjectURL(file);
            this.errorMessage = '';
            this.onFileSelect(file);
        } else {
            this.imageUrl = null;
            this.errorMessage = "Please select a valid image file.";
        }
        this.updateDisplay();
    }

    private handleDrop(event: DragEvent) {
        event.preventDefault();
        const file = event.dataTransfer?.files[0];
        if (file && file.type.startsWith("image/")) {
            this.imageUrl = URL.createObjectURL(file);
            this.errorMessage = '';
            this.onFileSelect(file);
        } else {
            this.imageUrl = null;
            this.errorMessage = "Please select a valid image file.";
        }
        this.updateDisplay();
    }

    private handleClick() {
        this.fileInput.render().click();
    }

    private updateDisplay() {
        this.container.innerHTML = '';
        this.container.appendChild(this.fileInput.render());

        const displayDiv = document.createElement("div");
        displayDiv.className = "d-flex items-center justify-center";

        if (this.imageUrl) {
            const img = document.createElement("img");
            img.src = this.imageUrl;
            img.alt = "Selected Photo";
            displayDiv.appendChild(img);
        } else {
            displayDiv.textContent = this.errorMessage || "Drag to drop or click here to select file";
        }

        this.container.appendChild(displayDiv);
    }

    render(): HTMLDivElement {
        return this.container;
    }
}
