import { baseUrl } from "../constants";
import { Student } from "../models/dto";
import { StudentService } from "../services";
import { Controller } from "./Controller";
import { StudentItem } from '../views/components/studentItem/StudentItem';
import router from "../router/routes";

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

    async getStudent(id: string) {
        try {
            const student = await this.studentService.getStudent('my-secret-token', id);

            if(!student) {
                throw new Error("Not found student!");
            }

            return student;
        } catch (error) {
            console.log("Error when fetch student:", error);
        }
    }

    handleCreateStudent(student: Student) {
        console.log(student.avatar);
        
        // create a new student
        this.studentService.postStudent('my-secret-token', student).then((response) => {
            console.log("Create student successfull!:", response);
            setTimeout(() => {
                router.navigate('/students');
            }, 1500);
        }).catch((error) => {
            console.log("Error when create student:", error);
        });
    }

    handleUpdateStudent(id: string, updatedData: Student) {
        this.studentService.patchStudent('my-secret-token', id, updatedData).then(() => {
            console.log("Update student successfull!:", updatedData);
            
            setTimeout(() => {
                router.navigate('/students');
            }, 1500);
        }).catch((error) => {
            console.log("Error when update student", error);
        })
    }

    handleDeleteStudent(id: string, row: HTMLTableRowElement) {
        console.log(id);
        
        // delete a student
        this.studentService.deleteStudent('my-secret-token', id).then((response) => {
            console.log("Delete student successfull!:", response);
            
            row.remove();
        }).catch((error) => {
            console.log("Error when delete student:", error);
        });
    }
}