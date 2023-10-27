let find = 5;
let array = [1, 2, 3, 4, 5];
let tip = true;
for (let i = 0; i < array.length ;i++){
    if (array[i] === find){
        console.log("индекс элемента =", i);
        tip = false
        break;
    }
} 
if (tip){
    console.log("элемент не найден");
}