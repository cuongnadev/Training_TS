import router from "./router/routes";

export default class App {
    constructor() {
        const app = document.getElementById("app") as HTMLElement;
        if (!app) {
            throw new Error("Root element with ID 'app' not found!");
        }

        // Khởi tạo sự kiện click
        this.setupNavigation();
        // Xử lý route hiện tại
        this.handleInitialRoute();
    }

    // Thiết lập xử lý điều hướng qua các link
    private setupNavigation(): void {
        document.addEventListener("click", (event) => {
            const navLinks = document.querySelectorAll('.nav-link_container');
            const target = event.target as HTMLAnchorElement;
            if (target.matches("a[data-router]")) {
                event.preventDefault();
                // Loại bỏ class active từ tất cả các link
                navLinks.forEach((link) => link.classList.remove('active'));

                // Thêm class active cho link được click
                target.classList.add('active');
                const path = target.getAttribute("href");
                if (path) {
                    router.navigate(path);
                }
            }
        });
    }

    // Xử lý route hiện tại khi khởi động
    private handleInitialRoute(): void {
        const path = window.location.pathname + window.location.search;
        router.navigate(path);
    }
}
