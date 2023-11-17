// Скопируйте код из файлов task_1. Доработайте функцию createStudentCard() так, чтобы она принимала не два
// параметра с информацией о студенте, а один — student, который является объектом с информацией о студенте.

(function (){
    function createStudentCard(studentObj) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let span = document.createElement('span');
        h2.textContent = studentObj.name;
        span.textContent = `Возраст: ${studentObj.age} лет`;
        div.append(h2)
        div.append(span)
        document.body.append(div)
    }

    let studentObj={
        name: 'Игорь',
        age: 17
       }
       
    createStudentCard(studentObj)
})();