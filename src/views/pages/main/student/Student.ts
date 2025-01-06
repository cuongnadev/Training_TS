import { StudentController } from "../../../../controllers";
import { CreateElement, PageLayout } from "../../../components/core";

class Students extends PageLayout<StudentController> {
    constructor() {
        super('student_container', new StudentController());

        this.initData();
    }

    initData(): void {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        const h1 = CreateElement('h1');
        h1.textContent = 'Student';

        this.container.appendChild(h1);
    }

    render() {
        return this.container;
    }
}

export default Students;