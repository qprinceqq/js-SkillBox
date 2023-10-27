let count = 12;
let array = [];
let ran;

for (let x = 1; x <= count; x++){
    array.push(x)
}
console.log(array)

for (let x = 0; x < count; x++){
    ran = Math.floor(Math.random() * count)
    temp = array[ran]
    array[ran] = array[x]
    array[x] = temp
}
console.log(array)