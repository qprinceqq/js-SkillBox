let n = -3;
let m = -10;
let ran1 = Math.round(Math.random() * (m-n)) + n;
let ran2 = Math.round(Math.random() * (m-n)) + n;

console.log(ran1, ran2);
console.log(ran1 > ran2);
console.log(ran1 < ran2);
console.log(ran1 >= ran2);
console.log(ran1 <= ran2);
console.log(ran1 === ran2);
console.log(ran1 !== ran2);