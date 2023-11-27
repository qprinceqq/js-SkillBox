let username = "deNIS"
let real_name = (username[0].toUpperCase() + username.substring(1).toLowerCase()).trim()
let surname = "Denchikov"
let real_surname = (surname[0].toUpperCase() + surname.substring(1).toLowerCase()).trim()

if (username === real_name){
    console.log("Имя не изменялось")
}
else{
    console.log("Имя было преобразовано:", real_name)
}

if (surname === real_surname){
    console.log("Фамилия не изменялось")
}
else{
    console.log("Фамилия была преобразована:", real_surname)
}