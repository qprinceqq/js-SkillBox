(function (){
    function createStudentsList(allStudents) {
        let ul = document.createElement('ul');
        for (let element of allStudents) {
            let h2 = document.createElement('h2');
            let span = document.createElement('span');
            let li = document.createElement('li');
            h2.textContent = element.name;
            span.textContent = 'Возраст: ' + String(element.age) + ' лет';
            li.append(h2);
            li.append(span);
            ul.append(li)
        }
        document.body.append(ul);
    }

    let allStudents=[
        {name: 'Валя', age: 11},
        {name: 'Таня',age: 24},
        {name: 'Рома',age: 21},
        {name: 'Надя', age: 34},
        {name: 'Антон', age: 7}
       ]
    createStudentsList(allStudents)
})();
