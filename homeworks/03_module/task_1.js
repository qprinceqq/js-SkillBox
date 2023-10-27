password = "password"
if ((password.includes('-') || password.includes('_')) && password.length > 3){
    console.log("Пароль надёжный")
}
else{
    console.log("Пароль недостаточно надёжный")
}