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

    async getTeacher(id: string) {
        try {
            const teacherData = await this.teacherService.getTeacher(id, 'my-secret-token');
            
            if (!teacherData) {
                throw new Error("Not found teacher");
            }
            return teacherData;
        } catch (error) {
            console.log("Error when fetch teacher:", error);
        }
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

    handleModifyTeacher(id: string, updateData: Object) {
        this.teacherService.patchTeacher(id, updateData, 'my-secret-token').then((response) => {
            console.log("Update Teacher Successfull!: " + response);

            setTimeout(() => {
                router.navigate(`/teachers`);
            }, 1500);
        }).catch((error) => {
            console.log("Error when modify Teacher: " + error);
        })
    }

    handleDeleteTeacher(id: string, item: HTMLDivElement) {
        // delete a teacher
        this.teacherService.deleteTeacher(id, 'my-secret-token').then((response) => {
            console.log("Delete Teacher Successfull!: " + response);
            
            item.remove();
        }).catch((error) => {
            console.log("Error when delete Teacher: " + error);
        })
    }
}