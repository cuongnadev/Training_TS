import { Controller } from "./Controller";

export class DashboardController extends Controller {
    fetchData(initContent: () => void): void {
        initContent();
    }
}