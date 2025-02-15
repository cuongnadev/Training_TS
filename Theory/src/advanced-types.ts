// Advanced types
type Admin = {
    name: string,
    privileges: string[],
  };
  type Employee = {
    name: string,
    startDate: Date,
  };
  
  type ElevatedEmployee = Admin & Employee; // Intersection
  
  const elevatedEmployee: ElevatedEmployee = {
    name: "John Doe",
    privileges: ["read", "write", "delete"],
    startDate: new Date(),
  };
  
  type Combinable = string | number; // Union
  type Numeric = number | boolean; // Union
  type Universarl = Combinable & Numeric;
  
  // Type Guards
  function add(a: Combinable, b: Combinable) {
    if(typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  
  type UnknownEmployee = Employee | Admin;
  
  function printEmployeeInfo(employee: UnknownEmployee) {
    console.log('name: ' + employee.name);
    if('privileges' in employee) {
      console.log('privileges: ' + employee.privileges);
    }
    if('startDate' in employee) {
      console.log('startDate: ' + employee.startDate);
    }
  }
  
  printEmployeeInfo(elevatedEmployee);
  
  class Car {
    drive(): void {
      console.log('Car is driving...');
    }
  }
  class Truck {
    drive(): void {
      console.log('Truck is driving...');
    }
    loadCargo(): void {
      console.log('Truck is loading cargo...');
    }
  }
  
  type Vehical = Car | Truck;
  const v1 = new Car();
  const v2 = new Truck();
  
  function useVehicle(vehicle: Vehical) {
    vehicle.drive();
  
    // if('loadCargo' in vehicle) {
    //   vehicle.loadCargo();
    // }
  
    if(vehicle instanceof Truck) {
      vehicle.loadCargo();
    }
  };
  
  useVehicle(v1);
  useVehicle(v2);
  
  // Discriminated Unions
  
  interface Birt {
    type: 'birt';
    flyingSpeed: number;
  }
  
  interface Horse {
    type: 'horse';
    runningSpeed: number;
  }
  
  type Animal = Birt | Horse;
  
  function moveAnimal(animal: Animal) {
    let speed;
    // if('flyingSpeed' in animal) {
    //   speed = animal.flyingSpeed;
    // } else if('runningSpeed' in animal) {
    //   speed = animal.runningSpeed;
    // }
  
    switch(animal.type) {
      case 'birt':
        speed = animal.flyingSpeed;
        break;
      case 'horse':
        speed = animal.runningSpeed;
        break;
      default:
        throw new Error('Invalid animal type');
    }
  
    console.log('Moving at Speed: ' + speed);
  }
  
  moveAnimal({type: 'birt', flyingSpeed: 10});
  
  // Type casting
  // use: as or <type>
  
  // const userInputElement = <HTMLInputElement>document.getElementById('message_input')!;
  const userInputElement = document.getElementById('message_input')! as HTMLInputElement;
  
  userInputElement.value = 'Hi there!';  