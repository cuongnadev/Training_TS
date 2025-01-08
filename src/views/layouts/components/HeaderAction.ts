import { bellIcon, gearIcon, placeholder } from "../../../constants";
import { Component, CreateElement } from "../../components";
import { Button } from "../../components";

export class HeaderActions extends Component {
    bellBtn!: Button;
    settingBtn!: Button;
    profile!: HTMLElement;

    constructor() {
        super("header-actions_container d-flex gap-4");

        this.initContent();
    }

    protected initContent(): void {
        // bell button
        this.bellBtn = new Button(
            null,
            bellIcon,
            null,
            "rounded",
            "md",
            "bell-btn",
            'active',
            () => {
                console.log("Notification button clicked");
            }
        );

        // gear button
        this.settingBtn = new Button(
            null,
            gearIcon,
            null,
            'rounded',
            'md',
            "setting-btn",
            'active',
            () => {
                console.log("Setting button clicked");
            }
        );

        // Thông tin người dùng
        const name = CreateElement("p");
        name.className = "header_actions-name";
        name.innerText = "John Doe";

        const role = CreateElement("p");
        role.className = "header_actions-role";
        role.innerText = "Admin";

        const infoContainer = CreateElement(
            'div',
            "header_actions-user d-flex flex-col items-end",
            [name, role]
        );

        // Avatar
        const avatarFrame = CreateElement("figure");
        avatarFrame.className = "d-flex items-center justify-center";

        const avatar = CreateElement("img");
        avatar.className = "header_actions-avatar";
        avatar.src = placeholder;
        avatar.alt = "User Avatar";

        avatarFrame.appendChild(avatar);

        this.profile = CreateElement(
            'div',
            "header-profile d-flex items-center gap-4",
            [infoContainer, avatarFrame]
        );

        // Thêm các phần tử vào container chính
        this.container.append(this.bellBtn.render(), this.settingBtn.render(), this.profile);
    }

    /**
     * Render toàn bộ component.
     */
    render() {
        return this.container;
    }
}
