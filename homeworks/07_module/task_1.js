// Создайте функцию с названием createStudentCard() 
// Функция должна создавать карточку студента внутри элемента body HTML-страницы. 
// Карточка студента представляет собой DOM-элемент, а именно тег div, внутри которого находится 
// заголовок h2 с именем студента из параметра name и span под заголовком с возрастом студента (age).

(function (){
    function createStudentCard(name, age) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let span = document.createElement('span');
        h2.textContent = name;
        span.textContent = `Возраст: ${age} лет`
        div.append(h2)
        div.append(span)
        document.body.append(div)
    }

    createStudentCard('Игорь', 17);
})();