import { Controller } from "./Controller";
import { StudentService, TeacherService } from "../services";
import { baseUrl, calendarIcon, foodIcon, studentIcon, teacherIcon } from "../constants";
import { OverviewItem } from "../views/components";

export class DashboardController extends Controller {
    private studentService: StudentService;
    private teacherService: TeacherService;
    dataOverviews: { students: number; teachers: number; } | undefined;

    constructor() {
        super();
        this.studentService = new StudentService(baseUrl);
        this.teacherService = new TeacherService(baseUrl);
    }

    /**
     * Fetch initial content
     * @param initContent - Callback function to initialize content
     */
    fetchData(initContent: () => void): void {
        initContent();
    }

    /**
     * Get dashboard overview data
     */
    async getOverviews(): Promise<{students: number, teachers: number} | undefined> {
        try {
            // // Kiểm tra token
            // const token = localStorage.getItem("token");
            // if (!token) {
            //     console.error("Token không tồn tại. Chuyển hướng đến trang đăng nhập.");
            //     // Chuyển hướng đến trang đăng nhập nếu cần
            //     window.history.pushState({}, '', "/login");
            //     return;
            // }

            const [studentsList, teachersList] = await Promise.all([
                this.studentService.getStudents('my-secret-token'),
                this.teacherService.getTeachers('my-secret-token'),
            ]);

            // Đếm số lượng phần tử
            const data = {
                students: studentsList.length || 0,
                teachers: teachersList.length || 0,
            };

            if (data.students === 0 && data.teachers === 0) {
                throw new Error('No data available');
            }

            console.log(data);
            
            return data;
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu tổng quan:", error);
        }
    }

    async handleOverviews(content: HTMLElement): Promise<void> {
        this.dataOverviews = await this.getOverviews();

        const overviewItemTypes = [
            {
                title: 'Students',
                quantity: this.dataOverviews!.students || 0,
                icon: studentIcon,
            },
            {
                title: 'Teachers',
                quantity: this.dataOverviews!.teachers || 0,
                icon: teacherIcon,
            },
            {
                title: 'Events',
                quantity: 100,
                icon: calendarIcon,
            },
            {
                title: 'Food',
                quantity: 100,
                icon: foodIcon,
            },
        ];

        overviewItemTypes.map((itemType) => {
            const lowerCaseTitle = itemType.title.toLowerCase();
            content.append(
                new OverviewItem().render(itemType.icon as string, itemType.title, itemType.quantity, [lowerCaseTitle])
            );
        });
    }
}
