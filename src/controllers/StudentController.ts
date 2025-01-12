import { baseUrl } from "../constants";
import { Student } from "../models/dto";
import { StudentService } from "../services";
import { Controller } from "./Controller";
import { StudentItem } from '../views/components/studentItem/StudentItem';

export class StudentController extends Controller {
    studentService: StudentService;
    constructor() {
        super();
        this.studentService = new StudentService(baseUrl);
    }
    fetchData(initContent: () => void): void {
        initContent();
    }

    async getStudentList(startItem?: number, itemsPerPage?: number, search?: string) {
        try {
            const studentsList = await this.studentService.getStudents('my-secret-token', startItem, itemsPerPage, search);
            
            if (!studentsList) {
                throw new Error("Không tìm thấy danh sách học sinh");
            }
            return studentsList;
        } catch (error) {
            console.log("Lỗi khi lấy students:", error);
        }
    }

    async handleStudentLists(tableBody: HTMLTableSectionElement, startItem: number, limit: number, search?: string) {
        const studentLists = await this.getStudentList(startItem, limit, search);
        
        studentLists.map((student: Student) => {
            tableBody.appendChild(
                new StudentItem(student).render()
            );
        });
    }
}