// const names = ['John', 'Coca', 'Lux'];
const names: Array<string> = ["John", "Coca", "Lux"];

const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

promise.then((data) => {
  data.split(" ");
});

// Generic Functions
function merge<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge<{ name: string }, { age: number }>(
  { name: "John" },
  { age: 30 }
);
console.log(mergeObj);
console.log(mergeObj.name);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptions = "Got no element";
  if (element.length === 1) {
    descriptions = `Got 1 element`;
  } else if (element.length > 1) {
    descriptions = `Got ${element.length} elements`;
  }

  return [element, descriptions];
}

// console.log(countAndDescribe({length: 3}));
// console.log(countAndDescribe([]));
// console.log(countAndDescribe(['John']));
console.log(countAndDescribe(["John", "Doe"]));

// keyof constraint
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Wick" }, "name"));

// Generic class
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");
textStorage.removeItem("Hello");
console.log(textStorage.getItems());

// Generic Utility types
interface CourseGoal {
  title: string;
  description: string;
}

function createCourseGoal(title: string, description: string): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  return courseGoal as CourseGoal;
}

const majors: Readonly<string[]> = ["NS", "AI"];
// majors.push('SE'); // push do not exits on type Readonly string[]
// majors.pop(); //
