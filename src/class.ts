class Department {
  // private readonly id: string;
  // private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  // Getters/Setters
  public get getName() {
    return this.name;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public get getEmployees(): string[] {
    return this.employees;
  }

  public set setEmployees(name: string) {
    this.employees.push(name);
  }

  public describe() {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  public addEmployee(name: string): void {
    this.employees.push(name);
  }

  public printEmployees(): void {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

/** <============================================================================> */

// key this
const accounting = new Department("C4", "Accounting");
accounting.describe(); // this-> accounting
// Department (C4): Accounting

const accountingCopy = { describe: accounting.describe };
accountingCopy.describe(); // this-> accountingCopy, Not have props name and id
// Department (undefined): undefined

/** <============================================================================> */

// public / private
accounting.addEmployee("Coi");
accounting.addEmployee("Cuong");
accounting.addEmployee("Thi");
// accounting.employees[2] = 'Loan'; // Error: employees is private

accounting.printEmployees();
// 3
// [ 'Coi', 'Cuong', 'Thi' ]

/** <==================================================================> */

// Inheritance
class ITDepartment extends Department {
  constructor(id: string, private reports: string[] = []) {
    super(id, "Akademi");
  }

  addReports(report: string): void {
    this.reports.push(report);
  }

  // Overriding
  public addEmployee(name: string): void {
    if (name === "John") {
      return;
    }
    this.getEmployees.push(name);
  }
}

const akademi = new ITDepartment("IT4");
akademi.describe(); // Department (IT4): Akademi
// akademi.setName("Akademi-4C"); sai cú pháp, setter ko phải là 1 hàm
akademi.setName = "Akademi-4C"; // setter
console.log(akademi.getName); // getter
akademi.addEmployee("John");
akademi.addEmployee("Erik");
akademi.addEmployee("Soho");
akademi.addReports("Don't have report...");
console.log(akademi);
