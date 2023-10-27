function getOlderUser(user1, user2){
    return (user1.age > user2.age) ? user1.name : user2.name
}


function getOlderUserArray(usersArr){
    let olderUserName;
    let maxAge = -Infinity;
    for (i in usersArr) {
        if (usersArr[i].age > maxAge) {
            maxAge = usersArr[i].age
            olderUserName = usersArr[i].name
        }
    }
    return olderUserName
    
}


function Main() {
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
    let result1 = getOlderUser(user1, user2)
    let result2 = getOlderUserArray(allUsers)
    console.log(result1)
    console.log(result2)
}


Main()