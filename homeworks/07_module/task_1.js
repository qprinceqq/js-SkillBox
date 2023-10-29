(function (){
    function createStudentCard(name, age) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        let span = document.createElement('span');
        h2.textContent = name;
        span.textContent = 'Возраст: ' + String(age) + ' лет';
        div.append(h2)
        div.append(span)
        document.body.append(div)
    }
    createStudentCard('Игорь', 17);
})();