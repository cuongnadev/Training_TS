import { callIcon, dotsIcon, emailIcon, placeholder } from "../../../constants";
import { Teacher } from "../../../models/dto";
import { Button } from "../common";
import { CreateElement } from "../core";

export class TeacherItem {
    teacherItem: HTMLDivElement;
    teacher: Teacher;
    teacherAvatar!: HTMLImageElement;
    teacherName!: HTMLHeadingElement;
    major!: HTMLParagraphElement;
    callIcon!: Button;
    emailIcon!: Button;
    actions!: HTMLButtonElement;
    constructor(teacher: Teacher) {
        this.teacherItem = CreateElement("div", "teacher-item_box d-flex flex-col items-center gap-4");
        this.teacher = teacher;

        this.initContent();
    }

    initContent() {
        // avatar
        this.teacherAvatar = CreateElement("img", "teacher-item_avatar");
        this.teacher.avatar ? (this.teacherAvatar.src = this.teacher.avatar) : (this.teacherAvatar.src = placeholder);
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
            'rounded',
            'md',
            "teacher-item_more-btn",
            'active',
            () => {},
        ).render();

        this.teacherItem.append(teacherAvatarFrame, teacherInfo, teacherContact, this.actions);
    }

    render() {
        return this.teacherItem;
    }
}
