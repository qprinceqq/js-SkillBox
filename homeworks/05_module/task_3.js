// Создайте функцию arrSort(), 
// Задача функции — сделать сортировку элементов переданного массива по возрастанию.

function arrSort(arr){
    return arr.sort((a, b) => (a - b));
}

console.log(arrSort([2,5,1,3,4]));
console.log(arrSort([12,33,3,44,100]));
console.log(arrSort([0,1]));
