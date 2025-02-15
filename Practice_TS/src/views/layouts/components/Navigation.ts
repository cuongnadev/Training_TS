import { homeIcon, logo, studentIcon, teacherIcon } from "~/constants";
import { NavLink, Component, CreateElement } from "~/views/components";

const navigationLinkItems = [
    {
        startIcon: homeIcon,
        label: "Dashboard",
        to: "/",
        componentPaths: ["/"],
    },
    {
        startIcon: studentIcon,
        label: "Students",
        to: "/students",
        componentPaths: ["/students", "/students/modify", "/students/add"],
    },
    {
        startIcon: teacherIcon,
        label: "teachers",
        to: "/teachers",
        componentPaths: ["/teachers", "/teachers/modify", "/teachers/add"],
    },
];

export default class Navigation extends Component {
    logoFrame!: HTMLElement;
    logoElement!: HTMLImageElement;
    logoTitle!: HTMLSpanElement;
    logoContainer!: HTMLDivElement;
    navLinkContainer!: HTMLElement;
    brandingText!: HTMLParagraphElement;
    creditsText!: HTMLParagraphElement;

    constructor() {
        super("nav_container");

        this.initContent();
    }

    initContent(): void {
        this.container.innerHTML = "";

        // Logo
        // logo Frame
        this.logoFrame = CreateElement("figure", "d-flex items-center justify-center");
        // logo Element
        // logo element
        this.logoElement = document.createElement("img");
        this.logoElement.className = "logo";
        this.logoElement.src = logo;
        this.logoFrame.append(this.logoElement);
        // title logo
        this.logoTitle = document.createElement("span");
        this.logoTitle.className = "title";
        this.logoTitle.innerText = "Akademi";
        // logo container
        this.logoContainer = CreateElement("div", "nav-logo_container d-flex justify-center items-center gap-4", [
            this.logoFrame,
            this.logoTitle,
        ]);

        // navigation links container
        this.navLinkContainer = document.createElement("nav");
        this.navLinkContainer.className = "nav-links_container d-flex flex-col items-end gap-2";

        // initializes navigation links
        navigationLinkItems.forEach((item) => {
            const navLink = new NavLink(item.startIcon as string, item.label, item.to, item.componentPaths);
            this.navLinkContainer.append(navLink.render());
        });

        // Branding & Credits
        this.brandingText = CreateElement("p", "branding-text");
        this.brandingText.innerText = "Hệ thống quản lý Akademi";

        this.creditsText = CreateElement("p", "credits-text");
        this.creditsText.innerHTML = "Kết nối giáo viên <span>♥</span> sinh viên";

        this.container.append(
            this.logoContainer,
            this.navLinkContainer,
            CreateElement("div", "d-flex flex-col items-center gap-2", [this.brandingText, this.creditsText]),
        );
    }

    render() {
        return this.container;
    }
}
