## 1. What is the difference between var, let, and const?

- **var** → Global scope, redeclare ও reassign করা যায়
- **let** → Block scoped, redeclare করা যায় না কিন্তু reassign করা যায়
- **const** → Block scoped, redeclare বা reassign কোনোটাই করা যায় না

```js
var a = 10;
var a = 20;
let b = 30;
b = 40;
const c = 50;
```

---

## 2. What is the difference between map(), forEach(), and filter()?

- forEach() → শুধু loop চালায়, কিছু return করে না
- map() → প্রতিটা element নিয়ে নতুন array return করে
- filter() → condition অনুযায়ী নতুন array বানায়

```js
const numbers = [1, 2, 3, 4, 5, 6, 7];
numbers.forEach((n) => console.log(n));
const squares = numbers.map((n) => n * n);
console.log(squares);
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens);
```

---

## 3. What are arrow functions in ES6?

Arrow functions provide a shorter and cleaner syntax for writing functions.

```js
function add(a, b) {
  return a + b;
}
const addArrow = (a, b) => a + b;
```

Benefits:

- Shorter syntax
- Lexical `this` binding
- Suitable for callbacks and functional programming

---

## 4. How does destructuring assignment work in ES6?

Destructuring allows extracting values from arrays or objects directly into variables.

```js
const name = ["foo", "jon", "harry"];
const [a, b, c] = numbers;
console.log(a, b, c);
const user = { name: "foo", age: 29 };
const { name, age } = user;
console.log(name, age);
```

---

## 5. Explain template literals in ES6. How are they different from string concatenation?

Template literals are defined using backticks (`` ` ``).  
They allow embedding variables and expressions inside a string using `${}` and support multi-line strings.

```js
const name = "jon";
const age = 25;
const doubleCot = "My name is " + name + " and I am " + age + " years old.";
const template = `My name is ${name} and I am ${age} years old.`;
console.log(doubleCot);
console.log(template);
```
