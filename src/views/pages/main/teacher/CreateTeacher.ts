import { TeacherController } from "../../../../controllers";
import { CreateElement, PageLayout } from "../../../components/core";

class CreateTeacher extends PageLayout<TeacherController> {
    constructor() {
        super('create-teacher_container', new TeacherController());

        this.initData();
    }
    
    initData() {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        const title = CreateElement('h1', 'create-teacher_title');
        title.textContent = 'Create Teacher';

        this.container.appendChild(title);
    }

    render() {
        return this.container;
    }
}

export default CreateTeacher;