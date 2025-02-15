import { schoolCalendar, schoolFinance, schoolPerformance } from "~/constants";
import { DashboardController } from "~/controllers";
import { CreateElement, PageLayout } from "~/views/components";

class Dashboard extends PageLayout<DashboardController> {
    overviews!: HTMLDivElement;
    contentOverview!: HTMLDivElement;
    schoolPerformance!: HTMLElement;
    schoolPerformanceImg!: HTMLImageElement;
    schoolCalendarImg!: HTMLImageElement;
    schoolCalendar!: HTMLElement;
    schoolFinanceImg!: HTMLImageElement;
    schoolFinance!: HTMLElement;
    schoolOperations!: HTMLDivElement;
    

    constructor() {
        super('dashboard_container d-flex flex-col gap-6', new DashboardController());
        this.container.setAttribute('name', 'Dashboard');

        this.initData();
    }

    initData(): void {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        this.contentOverview = CreateElement('div', 'dashboard_overviews-content d-flex items-center justify-between gap-4');
        this.overviews = CreateElement('div', 'dashboard_overviews d-flex items-center justify-center', [this.contentOverview]);

        // School Performance
        this.schoolPerformanceImg = CreateElement('img');
        this.schoolPerformanceImg.src = schoolPerformance;
        this.schoolPerformance = CreateElement('figure', 'school-performance_container', [this.schoolPerformanceImg]);

        // School Calendar
        this.schoolCalendarImg = CreateElement('img');
        this.schoolCalendarImg.src = schoolCalendar;
        this.schoolCalendar = CreateElement('figure', 'school-calendar_container', [this.schoolCalendarImg]);

        // School Finance
        this.schoolFinanceImg = CreateElement('img');
        this.schoolFinanceImg.src = schoolFinance;
        this.schoolFinance = CreateElement('figure', 'school-finance_container', [this.schoolFinanceImg]);

        // Container Finance + Calendar
        this.schoolOperations = CreateElement('div', 'school_operations d-flex items-center gap-6', [this.schoolCalendar, this.schoolFinance]);

        this.container.append(this.overviews, this.schoolPerformance, this.schoolOperations);

        this.controller?.handleOverviews(this.contentOverview);
    }

    render() {
        return this.container;
    }
}

export default Dashboard;