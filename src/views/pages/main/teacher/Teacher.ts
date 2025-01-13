import { TeacherController } from "../../../../controllers";
import { TypePageValues } from "../../../../types";
import { Pagination, TeacherItem, Toolbar } from "../../../components";
import { CreateElement, PageLayout } from "../../../components/core";

class Teachers extends PageLayout<TeacherController> {
    startItem: number = 0;
    studentPerPage: number = 15;
    teachersList: HTMLDivElement;
    toolbar: Toolbar;
    pagination: any;

    constructor() {
        super("teachers_container d-flex flex-col gap-6", new TeacherController());
        this.container.setAttribute("name", "Teacher");
        this.toolbar = new Toolbar(TypePageValues.Teacher);
        this.teachersList = CreateElement("div", "teachers_list");

        this.initData();
    }

    initData(): void {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        // Lắng nghe sự kiện 'search'
        this.toolbar.eventEmitter.on("search", (value: string) => this.updateListTeachers(undefined, value));

        this.controller?.handleTeacherLists(this.teachersList, this.startItem, this.studentPerPage);

        this.initPagination();
        this.container.append(this.toolbar.render(), this.teachersList);
    }

    private initPagination(): void {
        this.handleTotalTeachers().then((totalTeachers) => {
            this.pagination = new Pagination(this.startItem, this.studentPerPage, totalTeachers);
            this.pagination.handlePageChange = (currentItem: number) => this.updateListTeachers(currentItem);
    
            // Thêm Pagination vào `studentLists` sau khi có dữ liệu
            this.container.appendChild(this.pagination.render());
        });
    }
    
    private async handleTotalTeachers(): Promise<number> {
        const teachers = await this.controller?.getTeacherLists();
        return teachers ? teachers.length : 0;
    }

    updateListTeachers(currentItem?: number, value?: string) {
        this.teachersList.innerHTML = "";
        if(currentItem !== undefined) {
            this.controller?.handleTeacherLists(this.teachersList, currentItem, this.studentPerPage);
        } else if (value?.trim()) {
            this.controller?.handleTeacherLists(this.teachersList, currentItem!, this.studentPerPage, value);
            const pagination = document.querySelector('.pagination_container');
            if(pagination) {
                this.container.removeChild(this.pagination.render());
            }
        } else {
            this.controller?.handleTeacherLists(this.teachersList, 0, 8)
            this.container.appendChild(this.pagination.render());
        }
    }

    render() {
        return this.container;
    }
}

export default Teachers;
