// 1.Создайте функцию с названием getOlderUser(), которая будет определять, кто из двух пользователей старше. 

function getOlderUser(user1, user2){
    return (user1.age > user2.age) ? user1.name : user2.name
}

// 2.Напишите функцию getOlderUserArray(), в которую будете передавать массив объектов с пользователями. Функция должна вернуть имя старшего пользователя.

function getOlderUserArray(users_arr){
    sorted_users_arr = users_arr.sort((a, b) => (b.age - a. age))
    return sorted_users_arr[0].name
}


let user1={
    name: 'Игорь',
    age: 17
}
let user2={
    name: 'Оля',
    age: 21
}
let allUsers=[
    {name: 'Валя', age: 11},
    {name: 'Таня', age: 24},
    {name: 'Рома', age: 21},
    {name: 'Надя', age: 34},
    {name: 'Антон', age: 7}
]
console.log(getOlderUser(user1, user2))
console.log(getOlderUserArray(allUsers))

