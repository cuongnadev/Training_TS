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

class ITDepartment extends Department {
  admin: string[];
  constructor(id: string, admin: string[] = []) {
    super(id, "IT");
    this.admin = admin;
  }

  describe(): void {
    console.log("IT Department - ID: " + this.id);
  }
}

const akademi = new ITDepartment("C4");
akademi.describe();
// Department ID: C4

// Singletons & Private Constructors
class AccountingDepartment extends Department {
  // Static property to hold the single instance
  private static instance: AccountingDepartment;

  // Private constructor to prevent direct instantiation
  private constructor(id: string) {
    super(id, "Accounting");
  }

  // Static method to get the single instance
  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("AC7");
    return this.instance;
  }

  describe(): void {
    console.log("Accounting Department - ID: " + this.id);
  }
}

// const accounting = new AccountingDepartment;
// Error Constructor private
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting === accounting2);
// true
