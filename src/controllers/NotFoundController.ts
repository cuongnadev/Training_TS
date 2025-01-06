import { Controller } from "./Controller";

export class NotFoundController extends Controller {
    fetchData(initContent: () => void): void {
        initContent();
    }
}