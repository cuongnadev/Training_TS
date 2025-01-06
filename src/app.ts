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
            const target = event.target as HTMLAnchorElement;
            if (target.matches("a[data-router]")) {
                event.preventDefault();
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
