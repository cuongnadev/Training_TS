let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Cuong';

// userName = userInput; 
// Error type unknown not assignable to type string

if(typeof userInput === 'string') { // kiểm tra type
  userName = userInput; // ok
}

userName = userInput as string; // khẳng định type, ok
