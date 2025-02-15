interface Named {
  readonly name: string;
  outputName?: string;
}

interface Person extends Named {
  age: number;

  introduce(): void;
}

let user: Person;
user = {
  name: "Cuong",
  age: 20,
  introduce(): void {
    console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
  },
};
// user.name = "Coi"; error properties name readonly
user.introduce();

// with class
class Student implements Person {
  name: string;
  outputName?: string;
  age: number;

  constructor(name: string, age: number, outputName?: string) {
    this.name = name;
    this.age = age;
    this.outputName = outputName;
  }

  introduce(): void {
    console.log(`Hi, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

const student = new Student("Thi", 20);
student.introduce();
