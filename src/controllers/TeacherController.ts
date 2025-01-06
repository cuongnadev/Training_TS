import { Controller } from "./Controller";

export class TeacherController extends Controller {
    fetchData(initContent: () => void): void {
        initContent();
    }
    
}