(function() {
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');
        
        button.setAttribute('disabled', true);

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add("btn", 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    function createTodoItem(task, listName) {
        let itemHTML = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let tasksList;

        if (task.done) {
            itemHTML.classList.toggle('list-group-item-success');
        }
        itemHTML.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        itemHTML.textContent = task.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        doneButton.addEventListener('click', function() {
            tasksList = getFromStorage(listName)
            let index = tasksList.findIndex((item) => (item.id === task.id))
            tasksList[index].done = !(tasksList[index].done)
            pushToStorage(listName, tasksList)
            itemHTML.classList.toggle('list-group-item-success');
        })

        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function() {  
            if (confirm('Вы уверены?')) {
                tasksList = getFromStorage(listName)
                let index = tasksList.findIndex((item) => (item.id === task.id))
                tasksList.splice(index, 1)
                pushToStorage(listName, tasksList)
                itemHTML.remove();
            }
        });

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        itemHTML.append(buttonGroup);

        return {
            itemHTML: itemHTML,
            name: task.name,
            done: task.done,
            id: task.id,
        };

    }

    function pushToStorage(listName, list) {
        localStorage.setItem(listName, JSON.stringify(list))
    }

    function getFromStorage(listName) {
        let storage = JSON.parse(localStorage.getItem(listName))
        if (!storage) {storage = []}
        return storage
    }

    function getMaxId(tasks){
        let temp = tasks.slice(0)
        return (temp.length) ? ((temp.sort((a, b) => (b.id-a.id)))[0].id + 1) : 0
    }

    function createTodoApp(container, title = "Список дел", listName) {
        // Создаем титульник
        let todoAppTitle = createAppTitle(title);

        // Создаем список задач todoList
        let todoList = createTodoList();
        let tasks = getFromStorage(listName)
        for (item of tasks){
            let todoItem = createTodoItem({
                name: item.name,
                done: item.done,
                id: item.id,
            }, listName);
            todoList.append(todoItem.itemHTML);
        }
        
        //Создаем форму для ввода новых задач 
        let todoItemForm = createTodoItemForm();
        todoItemForm.input.addEventListener('input', function() {
            todoItemForm.button.disabled = !todoItemForm.button.disabled
        });

        //Добавляем форме ивент, который будет заполнять todoList
        todoItemForm.form.addEventListener('submit', function(e){
            tasks = getFromStorage(listName)
            e.preventDefault();
            todoItemForm.button.setAttribute('disabled', true);
            let todoItem = createTodoItem({
                name: todoItemForm.input.value,
                done: false,
                id: getMaxId(tasks)
            }, listName);
            todoList.append(todoItem.itemHTML);
            tasks.push({
                id: todoItem.id,
                name: todoItem.name,
                done: todoItem.done,
            });
            pushToStorage(listName, tasks);
            todoItemForm.input.value = '';
        });

        //Добавляем все элементы к уонтейнеру
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
    }  
    window.createTodoApp = createTodoApp;
})();