let a = 12.3456789;
let b = 9.876543;
let n = 3;
a = Math.floor(a % 1 * 10**n);
b = Math.floor(b % 1 * 10**n);

console.log(a, b);
console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);
console.log(a === b);
console.log(a !== b);