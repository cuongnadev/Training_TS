import { StudentController } from "../../../../controllers";
import { Pagination } from "../../../components";
import { CreateElement, PageLayout } from "../../../components/core";

const TitlesList = [
    "Name",
    "ID",
    "Date",
    "Parent Name",
    "City",
    "Contact",
    "Grade",
    "Action",
];

class Students extends PageLayout<StudentController> {
    startItem: number = 0;
    studentPerPage: number = 8;
    listStudent!: HTMLTableElement;
    studentLists!: HTMLDivElement;
    studentListHeader!: HTMLTableSectionElement;
    studentListBody!: HTMLTableSectionElement;
    pagination!: Pagination;

    constructor() {
        super('students_container', new StudentController());
        this.container.setAttribute('name', 'Student');
        
        this.initData();
    }

    initData(): void {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        // header table
        const checkBoxInput = CreateElement("input", "students_checkbox all");
        checkBoxInput.type = "checkbox";
        const checkbox = CreateElement('th', '', [checkBoxInput]);
        this.studentListHeader = CreateElement('thead', '', [checkbox]);
        TitlesList.forEach((title) => {
            const th = CreateElement('th', '', [title]);
            this.studentListHeader.appendChild(th);
        });

        // body table
        this.studentListBody = CreateElement('tbody');
        this.controller?.handleStudentLists(this.studentListBody, this.startItem, this.studentPerPage);

        // table
        this.listStudent = CreateElement('table', 'students_table', [this.studentListHeader, this.studentListBody]);

        // pagination
        this.studentLists = CreateElement('div', 'students_list d-flex flex-col', [this.listStudent]);
        this.initPagination();

        this.container.appendChild(this.studentLists);
    }

    private initPagination(): void {
        this.handleTotalStudents().then((totalStudents) => {
            this.pagination = new Pagination(this.startItem, this.studentPerPage, totalStudents);
            this.pagination.handlePageChange = (currentItem: number) => this.updateListStudents(currentItem);
    
            // Thêm Pagination vào `studentLists` sau khi có dữ liệu
            this.studentLists.appendChild(this.pagination.render());
        });
    }
    
    private async handleTotalStudents(): Promise<number> {
        const students = await this.controller?.getStudentList();
        return students ? students.length : 0;
    }

    updateListStudents(currentItem: number) {
        this.studentListBody.innerHTML = "";
        this.controller?.handleStudentLists(this.studentListBody, currentItem, this.studentPerPage);
    }

    render() {
        return this.container;
    }
}

export default Students;