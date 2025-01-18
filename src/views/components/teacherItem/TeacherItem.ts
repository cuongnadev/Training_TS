import { callIcon, dotsIcon, emailIcon, placeholder } from "~/constants";
import { TeacherController } from "~/controllers";
import { Teacher } from "~/models/dto";
import router from "~/router/routes";
import { Button, Dropdown, CreateElement } from "~/views/components";

export class TeacherItem {
    teacherItem: HTMLDivElement;
    teacher: Teacher;
    teacherAvatar!: HTMLImageElement;
    teacherName!: HTMLHeadingElement;
    major!: HTMLParagraphElement;
    callIcon!: Button;
    emailIcon!: Button;
    actions!: HTMLButtonElement;
    controller: TeacherController;

    constructor(teacher: Teacher) {
        this.controller = new TeacherController();
        this.teacherItem = CreateElement("div", "teacher-item_box d-flex flex-col items-center gap-4");
        this.teacher = teacher;

        this.initContent();
    }

    initContent() {
        // avatar
        this.teacherAvatar = CreateElement("img", "teacher-item_avatar");
        this.teacher.avatar
            ? typeof this.teacher.avatar === "object"
                ? (this.teacherAvatar.src = URL.createObjectURL(this.teacher.avatar))
                : (this.teacherAvatar.src = this.teacher.avatar)
            : (this.teacherAvatar.src = placeholder);
        this.teacherAvatar.alt = "";
        // avatar frame
        const teacherAvatarFrame = CreateElement("figure", "d-flex items-center justify-center", [this.teacherAvatar]);

        // name
        this.teacherName = CreateElement("h3", "teacher-item_name");
        this.teacherName.innerText = `${this.teacher.firstName} ${this.teacher.lastName}`;

        // major
        this.major = CreateElement("p", "teacher-item_major");
        this.major.innerText = this.teacher.degree;
        const teacherInfo = CreateElement("div", "teacher-item_info d-flex flex-col items-center gap-1", [
            this.teacherName,
            this.major,
        ]);

        // contact
        // call
        this.callIcon = new Button(
            null,
            callIcon,
            null,
            "rounded",
            "md",
            "teacher-item_contact-btn",
            "active",
            () => {},
        );

        // email
        this.emailIcon = new Button(
            null,
            emailIcon,
            null,
            "rounded",
            "md",
            "teacher-item_contact-btn",
            "active",
            () => {},
        );
        const teacherContact = CreateElement("div", "teacher-item_contacts d-flex items-center gap-2", [
            this.callIcon.render(),
            this.emailIcon.render(),
        ]);

        // action
        this.actions = new Button(
            null,
            dotsIcon,
            null,
            "rounded",
            "md",
            "teacher-item_more-btn",
            "active",
            () => {},
        ).render();

        const dropdownLink = [
            {
                href: `/teachers/modify?id=${this.teacher.id}`,
                label: "Modify",
                action: () => router.navigate(`/teachers/modify?id=${this.teacher.id}`)
            },
            {
                href: "/teachers/delete",
                label: "Delete",
                action: () => this.controller.handleDeleteTeacher((this.teacher.id as string), this.teacherItem)
            }
        ];

        const dropdown = new Dropdown();
        dropdown.init(this.actions, dropdownLink);

        this.teacherItem.append(teacherAvatarFrame, teacherInfo, teacherContact, this.actions);
    }

    render() {
        return this.teacherItem;
    }
}
