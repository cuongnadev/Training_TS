// routes.ts
import { Router } from ".";
import { Dashboard, Students, Teachers, NotFound, CreateStudent, CreateTeacher} from "../views/pages";
import { MainLayout } from "../views/layouts";

const app = document.getElementById("app") as HTMLElement;

const mainLayout = new MainLayout(app);

// Hàm hiển thị nội dung mặc định nếu không tìm thấy route
function fallbackHandler(): void { // params: Record<string, string>, query: URLSearchParams
    const notFound = new NotFound();
    if (app) {
        app.innerHTML = '';
        app.appendChild(notFound.render());
    }
}

// Khởi tạo router với fallback handler
const router = new Router(fallbackHandler);

// Định nghĩa các route và component tương ứng
router.addRoute("/", () => {
    mainLayout.updateMainContent(new Dashboard().render());
});

router.addRoute("/students", () => {
    mainLayout.updateMainContent(new Students().render());
});

router.addRoute("/students/add", () => {
    mainLayout.updateMainContent(new CreateStudent().render());
});

router.addRoute("/teachers", () => {
    mainLayout.updateMainContent(new Teachers().render());
});

router.addRoute("/teachers/add", () => {
    mainLayout.updateMainContent(new CreateTeacher().render());
});

export default router;
