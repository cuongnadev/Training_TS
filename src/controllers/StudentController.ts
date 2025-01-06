import { Controller } from "./Controller";

export class StudentController extends Controller {
    fetchData(initContent: () => void): void {
        initContent();
    }

}