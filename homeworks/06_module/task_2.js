function filter(arr, tag, item){
    let filteredArr = [];
    for (let i of arr) {
        if (i[tag] === item){
            filteredArr.push(i)
        }
    }
    return filteredArr
}


function Main() {
    let objects = [
        { name: 'Василий', surname: 'Васильев' },
        { name: 'Иван', surname: 'Иванов' },
        { name: 'Пётр', surname: 'Петров' }
    ]
    let result = filter(objects, 'name', 'Иван');
    console.log(result)
}


Main()