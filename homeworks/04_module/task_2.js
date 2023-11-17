// Создайте с помощью цикла for массив упорядоченных чисел с количеством чисел, равным count.
// С помощью второго цикла перемешайте этот массив. 

let count = 12;
let random;

// создание массива 0, 1, 2 и тд
let array = Array.from({length: count}, (_, i) => (i))
console.log(array)


// перемешивание массива
for (let x in array){
    random = Math.floor(Math.random() * count)
    temp = array[random]
    array[random] = array[x]
    array[x] = temp
}
console.log(array)