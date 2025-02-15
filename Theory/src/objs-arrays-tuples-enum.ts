// Object types, Array types, Tuples types, emun

enum Role {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  // role: [number, string], // tuples
  role: Role;
} = {
  name: "Cuong",
  age: 20,
  hobbies: ["reading", "coding", "listening"],
  // role: [1, "Admin"], // tuples
  role: Role.ADMIN,
};

console.log(person.role);
