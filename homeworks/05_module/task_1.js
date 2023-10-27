function getAge(birthYear) {
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    return currentYear - birthYear
}

function Main() {
    console.log('Ваш возраст:', getAge(2004))
}

Main()