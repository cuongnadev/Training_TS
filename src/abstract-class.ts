abstract class Department {
  private employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {}

  abstract describe(): void;

  public addEmployee(name: string): void {
    this.employees.push(name);
  }

  public printEmployees(): void {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

/** <============================================================================> */

// const accounting = new Department("C4", "Accounting");
// Error cannot creat instance of an abstract class

// Inheritance
class ITDepartment extends Department {
  constructor(id: string, private reports: string[] = []) {
    super(id, "Akademi");
  }

  describe(): void {
    console.log("Department ID: " + this.id);
  }

  addReports(report: string): void {
    this.reports.push(report);
  }
}

const akademi = new ITDepartment("C4");
akademi.describe();
// Department ID: C4
