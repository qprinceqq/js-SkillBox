// Создайте функцию с названием getAge(), которая будет рассчитывать возраст по году рождения. 
// Функция должна сделать расчёт возраста по текущему году. 


function getAge(birth_year) {
    return (new Date()).getFullYear() - birth_year
}

console.log('Ваш возраст:', getAge(2004))
