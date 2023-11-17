// Напишите функцию filter(), фильтрующую массив объектов по значению свойства.
// Массив, название свойства и нужное значение должны передаваться в качестве аргументов.

function my_filter(arr, tag, to_fiter){
    return arr.filter((item) => (item[tag] === to_fiter))
}


let objects = [
    { name: 'Василий', surname: 'Васильев' },
    { name: 'Иван', surname: 'Иванов1' },
    { name: 'Пётр', surname: 'Петров' },
    { name: 'Иван', surname: 'Иванов2' },
    { name: 'Иван', surname: 'Иванов3' },
    { name: 'ИВАН', surname: 'Иванов!' },
]
console.log(my_filter(objects, 'name', 'Иван'))



