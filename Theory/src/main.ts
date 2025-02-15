// Decorator thông thường
// function Logger(constructor: Function) {
//   console.log('Logger executed');
//   console.log(constructor);
// }

// @Logger
// class Person {
//   name = 'Max';
//   constructor() {
//     console.log('Creating a new person...');
//   }
// }

// Output:
// Logger executed
// class Person {...}
// Creating a new person...


/** <=========================================================================> */
// Decorator Factory
function Logger(logString: string) {
  console.log('Logger Factory');
  
  return function(constructor: Function) {
    console.log('Rendering logger'); 
    
    console.log(logString);
    console.log(constructor);
  }
}

// Structure
// 1. Decorator Factory
function WithTemplate(template: string, hookId: string) {
  console.log('Template Factory'); // Log khi factory được gọi

  // 2. Decorator Function
  return function<T extends {new(...args: any[]): {name: string}}>(
    originalConstructor: T
  ) {
    return class extends originalConstructor { // return new constructor
      constructor(...args: any[]) {
        super();
        console.log('Rendering template'); // Log khi decorator thực thi

        // 3. Logic bên trong
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    }
  }
}

// Add mutiple Decorator
@Logger('Logging - Person')
@WithTemplate('<h1>Hello, my Person object</h1>', 'app')
class Person {
  name = 'Max';
  
  constructor() {
    console.log('Creating a new person...');
  }
}

const p = new Person();


/** <=========================================================================> */
// Class Decorator
function Log0(constructor: Function) {
  console.log('Class Decorator!');
  console.log('constructor :', constructor);
}
// Property Decorator
function Log1(target: any, propertyName: string | symbol) {
  console.log('Property Decorator!');
  console.log('target:', target);
  console.log('propertyName:', propertyName);
}

// Accessor Decorator
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor Decorator!');
  console.log('target:', target);
  console.log('name:', name);
  console.log('discriptor:', descriptor);
}

// Method Decorator
function Log3(target: any, methodName: string | symbol, descriptor: PropertyDescriptor) {
  console.log('Method Decorator!');
  console.log('target:', target);
  console.log('methodName:', methodName);
  console.log('descriptor:', descriptor);
}

// Parameter Decorator
function Log4(target: any, name: string | symbol, parameterIndex: number) {
  console.log('Parameter Decorator!');
  console.log('target:', target);
  console.log('name:', name);
  console.log('parameterIndex:', parameterIndex);
}

@Log0
class Product {
  @Log1
  title: string; // target is Product.prototype
  // static title: string; // target is Product
  private _price: number

  @Log2
  set price(val: number) {
    if ( val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    // with Parameter Decorator, name is name Method use parameter
    return this._price * (1 + tax);
  }
}

// decorators are executed at design time, not runtime.
// The decorators for methods, properties, and accessors are executed when the class and its members are defined, before the class's constructor function is executed.


/** <=========================================================================> */
function Autobind (target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // Lấy phương thức gốc từ descriptor.
  const adjDescriptor: PropertyDescriptor = {
    configurable: true, // Cho phép cấu hình lại thuộc tính.
    enumerable: false, // Không liệt kê thuộc tính trong vòng lặp.
    get() {
      // `this` tại đây sẽ trỏ đến instance của lớp (Printer).
      const boundFn = originalMethod.bind(this); // Gắn chặt `this` vào phương thức gốc.
      return boundFn;
    },
  }
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', printer.showMessage.bind(printer));
button.addEventListener('click', printer.showMessage);


/** <=========================================================================> */
interface ValidateConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidateConfig = {};

function Required(targer: any, propertyname: string) {
  registeredValidators[targer.constructor.name] = {
    ...registeredValidators[targer.constructor.name],
    [propertyname]: ['required']
  };
}

function PositiveNumber(targer: any, propertyname: string) {
  registeredValidators[targer.constructor.name] = {
    ...registeredValidators[targer.constructor.name],
    [propertyname]: ['positive']
  };
}

function validate(obj: any) {
  const objConstructor = obj.constructor.name;
  const validatorsConfig = registeredValidators[objConstructor];

  if (!validatorsConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in validatorsConfig) {
    for (const validator of validatorsConfig[prop]) {
      switch (validator) {
        case'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleEl = (document.getElementById('title') as HTMLInputElement);
  const priceEl = (document.getElementById('price') as HTMLInputElement);

  const title = titleEl.value;
  const price = parseFloat(priceEl.value);

  const createdCourse = new Course(title, price);

  if(!validate(createdCourse)) {
    alert('Invalid input, please try again!')
    return;
  }

  console.log(createdCourse);
});
