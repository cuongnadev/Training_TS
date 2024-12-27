// type aliases
type Combinable = number | string; // union
type ConversionDescription = "as-number" | "as-text"; // literal

// Union - Literal types
const combine = (
  input1: Combinable, // union
  input2: Combinable, // union
  resultConversion: ConversionDescription // literal
) => {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
};

const combinedAges = combine(20, 18, "as-number");
console.log(combinedAges); // 38

const combinedStringAges = combine("20", "18", "as-number");
console.log(combinedStringAges); // 38

const combinedNames = combine("Anh", "Cuong", "as-text");
console.log(combinedNames); // AnhCuong
