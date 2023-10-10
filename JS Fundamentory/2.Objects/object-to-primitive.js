const person = {
  name: "John",
  age: 23,
  //   [Symbol.toPrimitive](hint) {
  //     console.log("hint: ", hint);
  //     return hint == "string" ? `{name: "${this.name}"}` : this.age;
  //   },

  // // for hint="string"
  // toString() {
  //     return `{name: "${this.name}"}`;
  //   },

  //   // for hint="number" or "default"
  //   valueOf() {
  //     return this.money;
  //   }
};

console.log(person);
console.log("2" - 2);
console.log(String(person) + "abc");
console.log(+person);
console.log(person.toString());
console.log(person.valueOf());
