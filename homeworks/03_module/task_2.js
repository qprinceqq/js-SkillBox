let username = "deNIS"
let surname = "Denchikov"
let real_name = username[0].toUpperCase() + username.substring(1).toLowerCase()
let real_surname = surname[0].toUpperCase() + surname.substring(1).toLowerCase()

if (username === real_name){
    console.log("Имя осталось без изменений")
}
else{
    console.log("Имя было преобразовано:", real_name)
}

if (surname === real_surname){
    console.log("Фамилия осталась без изменений")
}
else{
    console.log("Фамилия была преобразована:", real_surname)
}