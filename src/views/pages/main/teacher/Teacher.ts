import { TeacherController } from "../../../../controllers";
import { PageLayout } from "../../../components/core";

class Teachers extends PageLayout<TeacherController> {
    constructor() {
        super('teacher_container', new TeacherController());

        this.initData();
    }

    initData(): void {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Teachers';

        this.container.append(h1);
    }


    render() {
        return this.container;
    }
}

export default Teachers;