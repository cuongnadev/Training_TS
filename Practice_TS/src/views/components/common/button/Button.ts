import { CreateElement } from "~/views/components";

export const buttonVariants = {
    filled: 'filled',
    outlined: 'outlined',
    rounded: 'rounded',
    icon: 'icon',
} as const;

export const buttonSizes = {
    sm: 'sm',
    lg: 'lg',
    md: '',
} as const;

export const states = {
    active: 'active',
    disabled: 'disabled'
} as const;

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = keyof typeof buttonSizes;
type States = keyof typeof states;

/**
 * USAGE:
 * use @param buttonVariants as argument for @param variant in @constructor
 * use @param buttonSizes as argument for @param size in @constructor
 * use @param states as argument for @param state in @constructor
 * leave startIcon, endIcon, or label null if not needed
 * example:
 * const button = new Button(
 *   "A button",
 *   startIcon,
 *   endIcon,
 *   "filled",
 *   "md",
 *   "active"
 *   "button-class-name",
 *   onClick
 * );
 * const buttonElement = button.render();
 */
export class Button {
    private button: HTMLButtonElement;
    private buttonLabel?: HTMLSpanElement;
    private startIcon?: HTMLElement;
    private endIcon?: HTMLElement;

    constructor(
        label?: string | null,
        startIcon?: string | null,
        endIcon?: string | null,
        variant: ButtonVariant = 'icon',
        size: ButtonSize = 'md',
        className: string = "",
        state: States = "active",
        onClick: () => void = () => {}
    ) {
        // button element
        this.button = CreateElement('button');
        this.button.className = Button.getClassName(variant, size, className);
        this.setDisabled(state);
        this.button.addEventListener('click', (e) => {
            if (!this.button.disabled) {
                onClick();
            } else {
                e.preventDefault();
            }
        });

        // label
        if (label) {
            this.buttonLabel = CreateElement('span');
            this.buttonLabel.append(label);
        }

        // icons
        if (startIcon) {
            this.startIcon = CreateElement('div');
            this.startIcon.innerHTML = startIcon;
        }
        if (endIcon) {
            this.endIcon = CreateElement('div');
            this.endIcon.innerHTML = endIcon;
        }

        // add children
        if (this.startIcon?.firstChild) {
            this.button.append(this.startIcon.firstChild as Node);
        }
        if (this.buttonLabel) {
            this.button.append(this.buttonLabel);
        }
        if (this.endIcon?.firstChild) {
            this.button.append(this.endIcon.firstChild as Node);
        }
    }

    static getClassName(variant: ButtonVariant, size: ButtonSize, ...classes: string[]): string {
        const className = ['btn', buttonVariants[variant], buttonSizes[size], ...classes];
        return className.filter(Boolean).join(' ');
    }

    /**
     * Set the button's disabled state.
     * Updates both the `disabled` attribute and the visual style.
     */
    setDisabled(state: States): void {
        if (state === 'disabled') {
            this.button.classList.add('disabled');
        } else {
            this.button.classList.remove('disabled');
        }
    }

    render(): HTMLButtonElement {
        return this.button;
    }
}
