// Напишите генератор массивов длиной count со случайными числами от n до m. Учтите, что n и m могут быть отрицательными, а также может быть n > m или n < m. 

let count = 20
let n = 100
let m = -20
let array = []
for (let i = 0; i < count; i++){
    array.push(Math.round(Math.random() * (m-n)) + n)
}

console.log(array)