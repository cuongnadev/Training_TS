function add(n1: number, n2: number): number | string {
  return n1 + n2;
}

function print(n: number | string): void {
  console.log(n);
}

let combineValues: Function;
// combineValues = 5; error

combineValues = add;
print(combineValues(1, 2));
// 3

combineValues = print;
print(combineValues(7, 9));
// 7
// undefined

let combineValues1: (a: number, b: number) => number | string;
combineValues1 = add;
print(combineValues1(5, 6));
// 11

// callback
function addAndHandle(n1: number, n2: number, cb: (n: number) => void) {
  const result = n1 + n2;
  const value = cb(result);
  console.log(value);
}
addAndHandle(4, 4, (result) => {
  console.log(result);
  return result;
});
// 8
// 8
