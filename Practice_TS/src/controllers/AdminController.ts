import { Controller } from "./Controller";

export class AdminController extends Controller {
    fetchData(initContent: () => void): void {
        initContent();
    }
}