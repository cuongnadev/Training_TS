import { DashboardController } from "../../../../controllers";
import { PageLayout } from "../../../components/core";

class Dashboard extends PageLayout<DashboardController> {

    constructor() {
        super('dashboard_container', new DashboardController());

        this.initData();
    }

    initData(): void {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        const h1 = document.createElement('h1');
        h1.textContent = 'Dashboard';

        this.container.appendChild(h1);
    }

    render() {
        return this.container;
    }
}

export default Dashboard;