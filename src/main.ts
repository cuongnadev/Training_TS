const add = (
  n1: number,
  n2: number, 
  showResult: boolean, 
  title: string
): void => {
  let result = n1 + n2;
  if (showResult) {
      console.log(title + result);
  } else {
      throw new Error('Not show')
  }
};

let num1: number;
num1 = 10;
const num2 = 9.5;
add(num1, num2, true, "Sum: ");
