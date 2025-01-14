import { callIcon, dotsIcon, emailIcon, placeholder } from "../../../constants";
import { Student } from "../../../models/dto";
import { Button } from "../common";
import { CreateElement } from "../core";
const columns = [];
export class StudentItem {
    student: Student;
    studentRow!: HTMLTableRowElement;
    checkbox!: HTMLTableCellElement;
    studentAvatar!: HTMLImageElement;
    studentName!: HTMLParagraphElement;
    studentID!: HTMLParagraphElement;
    dob!: HTMLParagraphElement;
    parentName!: HTMLParagraphElement;
    city!: HTMLParagraphElement;
    call!: any;
    contact!: HTMLDivElement;
    mail!: Button;
    studentGrade!: HTMLDivElement;
    actions!: HTMLTableCellElement;

    constructor(student: Student) {
        this.studentRow = CreateElement("tr", "student-item_container");
        this.student = student;

        this.initContent();
    }

    protected initContent(): void {
        // checkbox
        const checkBoxInput = CreateElement("input");
        checkBoxInput.type = "checkbox";
        this.checkbox = CreateElement("td", "student_checkbox", [checkBoxInput]);
        checkBoxInput.addEventListener("change", (event) => {
            const target = event.target as HTMLInputElement;
            if (target && target.checked) {
                this.studentRow.classList.add("checked");
            } else {
                this.studentRow.classList.remove("checked");
            }
        });
        // student_user
        // avatar
        this.studentAvatar = CreateElement("img", "student_avatar");
        console.log(this.student);
        
        this.student.avatar 
        ? typeof this.student.avatar === 'object' 
        ? (this.studentAvatar.src = URL.createObjectURL(this.student.avatar)) 
        : (this.studentAvatar.src = this.student.avatar) 
        : (this.studentAvatar.src = placeholder);
        this.studentAvatar.alt = "";
        // avatar frame
        const studentAvatarFrame = CreateElement("figure", "d-flex items-center justify-center", [this.studentAvatar]);

        // name
        this.studentName = CreateElement("p", "student_name");
        this.studentName.innerText = `${this.student.firstName} ${this.student.lastName}`;

        // student info container
        const studentUser = CreateElement("td", "student_user d-flex items-center gap-4", [
            studentAvatarFrame,
            this.studentName,
        ]);

        // student ID
        this.studentID = CreateElement("td", "student_id");
        this.studentID.innerHTML = `# ${this.student.id}`;

        // date
        this.dob = CreateElement("td", "student_dob");
        this.dob.innerHTML = `${this.student.dob}`;

        // parent name
        this.parentName = CreateElement("td", "student_parent-name");
        this.parentName.innerHTML = `${this.student.parentFirstName} ${this.student.parentLastName}`;

        // city
        this.city = CreateElement("td", "student_city");
        this.city.innerHTML = `${this.student.address}`;

        // contact
        // call
        this.call = new Button(null, callIcon, null, "icon", "md", "student_contact-btn", "active", () => {});
        // mail
        this.mail = new Button(null, emailIcon, null, "icon", "md", "student_contact-btn", "active", () => {});
        const contactBox = CreateElement("div", "d-flex items-center justify-start gap-4", [
            this.call.render(),
            this.mail.render(),
        ]);
        this.contact = CreateElement("td", "student_contact ", [contactBox]);

        // student Grade
        // text
        const gradeText = CreateElement("span", "d-flex items-center justify-center");
        gradeText.innerText = this.student.class;
        const gradeBox = CreateElement("div", "d-flex items-center justify-start", [gradeText]);
        this.studentGrade = CreateElement("td", `student_grade grade-${this.student.class.slice(-1).toLowerCase()}`, [
            gradeBox,
        ]);

        // Actions
        const actionBtn = new Button(null, dotsIcon, null, "icon", "md", "", "active", () => {});
        this.actions = CreateElement("td", "student_action-more d-flex items-center", [actionBtn.render()]);

        this.studentRow.append(
            this.checkbox,
            studentUser,
            this.studentID,
            this.dob,
            this.parentName,
            this.city,
            this.contact,
            this.studentGrade,
            this.actions,
        );
    }

    render() {
        return this.studentRow;
    }
}
