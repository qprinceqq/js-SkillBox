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

    function createTodoItem(task) {
        let itemObject = {
            item : document.createElement('li'),
            done : task.done
        };
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        itemObject.item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        itemObject.item.textContent = task.name;

        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        itemObject.item.append(buttonGroup);

        return {
            itemObject,
            doneButton,
            deleteButton,
        };

    }

    function pushToStorage(listName, list) {
        localStorage.setItem(listName, JSON.stringify(list))
    }

    function getFromStorage(listName) {
        let storage = JSON.parse(localStorage.getItem(listName))
        if (storage === null) {storage = []}
        return storage
    }

    function addEvents(listName, todoItem, tasks) {
        if (todoItem.itemObject.done) {
            todoItem.itemObject.item.classList.toggle('list-group-item-success');
        }
        todoItem.doneButton.addEventListener('click', function() {
            if (todoItem.itemObject.done === false){
                todoItem.itemObject.done = true;
                for (let i of tasks) {
                    if (todoItem.id === i.id) {
                        i.done = true
                        pushToStorage(listName, tasks)
                        break
                    }
                }
            }
            else{
                todoItem.itemObject.done = false;
                for (let i of tasks) {
                    if (todoItem.id === i.id) {
                        i.done = false
                        pushToStorage(listName, tasks)
                        break
                    }
                }
            }
            todoItem.itemObject.item.classList.toggle('list-group-item-success');
        });
        todoItem.deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
                todoItem.itemObject.item.remove();
                for (let i in tasks) {
                    if (todoItem.id === tasks[i].id) { 
                        tasks.splice(i, 1)
                        pushToStorage(listName, tasks)
                        break
                    }
                }
            }
        });

        return todoItem
    }
    
    function createTodoApp(container, title = "Список дел", listName) {
        let tasks = getFromStorage(listName)
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();
        for (item of tasks){
            let todoItem = createTodoItem({
                name: item.name,
                done: item.done,
            });
            todoItem.id = item.id
            todoItem = addEvents(listName, todoItem, tasks)
            todoList.append(todoItem.itemObject.item);
        }

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);
        
        
        todoItemForm.input.addEventListener('input', function() {
            if (todoItemForm.button.getAttribute('disabled')){
                todoItemForm.button.removeAttribute('disabled');
            }
        });

        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();
            todoItemForm.button.setAttribute('disabled', true);

            let todoItem = createTodoItem({
                name: todoItemForm.input.value,
                done: false
            });
            todoItem.id = (function(tasks) {
                if (!tasks){
                    return 0
                }
                let maxId = -1
                for (i of tasks){
                    if (i.id > maxId){
                        maxId = i.id
                    }
                }
                return maxId + 1
            })(tasks)
            todoItem = addEvents(listName, todoItem, tasks)
            todoList.append(todoItem.itemObject.item);
            tasks.push({
                id: todoItem.id,
                name: todoItemForm.input.value,
                done: todoItem.itemObject.done,
            });
            pushToStorage(listName, tasks);
            todoItemForm.input.value = '';
        });
    }  
    window.createTodoApp = createTodoApp;
})();