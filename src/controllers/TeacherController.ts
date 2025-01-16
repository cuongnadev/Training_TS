import { baseUrl } from "../constants";
import { Teacher } from "../models/dto";
import router from "../router/routes";
import { TeacherService } from "../services";
import { TeacherItem } from "../views/components";
import { Controller } from "./Controller";

export class TeacherController extends Controller {
    teacherService: TeacherService;
    constructor() {
        super();
        this.teacherService = new TeacherService(baseUrl);
    }

    fetchData(initContent: () => void): void {
        initContent();
    }

    async getTeacherLists(startItem?: number, itemsPerPage?: number, search?: string) {
        try {
            const teacherLists = await this.teacherService.getTeachers('my-secret-token', startItem, itemsPerPage, search);
            
            if (!teacherLists) {
                throw new Error("Không tìm thấy danh sách giáo viên");
            }
            return teacherLists;
        } catch (error) {
            console.log("Lỗi khi lấy danh sách giáo viên:", error);
        }
    }
    
    async handleTeacherLists(lists: HTMLDivElement, startItem: number, limit: number, search?: string) {
        const teacherLists = await this.getTeacherLists(startItem, limit, search);
        
        teacherLists.map((teacher: Teacher) => {
            lists.appendChild(
                new TeacherItem(teacher).render()
            );
        });
    }
    
    handleCreateTeacher (teacher: Teacher) {
        // validation

        // create a new teacher
        this.teacherService.postTeacher(teacher,'my-secret-token').then((response) => {
            console.log("Create Teacher Successfull!: " + response);
            setTimeout(() => {
                router.navigate('/teachers');
            }, 1500);
        }).catch((error) => {
            console.log("Error when create Teacher: " + error);
        })
    }
}