const todoForm = document.querySelector('form#todo-form');
const todoInput = todoForm.querySelector('input:first-child');
const todoList = document.querySelector('ul#todo-list');

let todos = [];
const TODOS = 'todos';

const SELECTED = 'selected';
const STARED = 'stared';

/**
 * 브라우저 - 로컬 스토리지에 todos 리스트를 저장하는 함수.
 */
function saveTodos() {
    localStorage.setItem(TODOS, JSON.stringify(todos));
}


/**
 * 휴지통 아이콘을 클릭했을 때, 해당 <li>를 제거하는 함수.
 * @param {clickEvent} event - click-event 
 */
function removeTodo(event) {
    event.preventDefault();
    const removeLi = event.currentTarget.parentElement;
    const removeID = removeLi.id;
    removeLi.remove();
    todos = todos.filter(item => item.id !== parseInt(removeID));

    if (todos.length === 0) {
        localStorage.removeItem(TODOS);
    }
    else {
        saveTodos();
    }
}


/**
 * Input으로 입력받은 값을 화면에 그려주는 함수.
 * @param {Object} newTodo - {id: 현재시간, text:내용}
 */
function drawTodo(newTodo) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const starBtn = document.createElement('div');
    const starIcon = document.createElement('i');
    const deleteBtn = document.createElement('div');
    const deleteIcon = document.createElement('i');

    li.className = newTodo.class;
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    deleteIcon.className = 'fa-solid fa-trash';
    starIcon.className = 'fa-solid fa-star';

    if ((li.className).includes(SELECTED)) {
        li.classList.add(SELECTED);
        starBtn.classList.add(STARED);
        todoList.prepend(li);
    }
    else {
        todoList.appendChild(li);
    }

    starBtn.appendChild(starIcon);
    deleteBtn.appendChild(deleteIcon);
    li.append(starBtn, span, deleteBtn);


    starBtn.addEventListener('click', starTodo);
    deleteBtn.addEventListener('click', removeTodo);
}


/**
 * Form에서 Input으로부터 입력값을 받았을 때, 실행되는 함수.
 * @param {submitEvent} event - submit-event
 */
function handleSubmit(event) {
    event.preventDefault();
    const todo = todoInput.value;
    todoInput.value = "";
    const newTodo = {
        id: Date.now(),
        class: 'list',
        text: todo,
    }
    drawTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
}

todoForm.addEventListener('submit', handleSubmit);

const savedTodos = localStorage.getItem(TODOS);

if (savedTodos !== null) {
    let savedData = JSON.parse(savedTodos);
    const selected = savedData.filter(object => (object.class).includes(SELECTED));
    const others = savedData.filter(object => !(object.class).includes(SELECTED));

    savedData = [...selected, ...others];
    todos = savedData;
    todos.forEach(item => {
        drawTodo(item);
    });
}

function starTodo(event) {
    const star = event.currentTarget;
    const list = event.currentTarget.parentElement;
    const listID = list.id;

    if ((list.className).includes('selected')) {
        list.classList.remove(SELECTED);
        todos.forEach(object => {
            switch (object.id === parseInt(listID)) {
                case true:
                    object.class = 'list';
                    break;
                case false:
                    break;
            }
        });
        star.classList.remove(STARED);
    }
    else {
        list.classList.add(SELECTED);
        todos.forEach(object => {
            switch (object.id === parseInt(listID)) {
                case true:
                    object.class = 'list selected';
                    break;
                case false:
                    break;
            }
        });
        star.classList.add(STARED);
    }

    const selected = todos.filter(object => (object.class).includes('selected'));

    if (selected.length > 0) {
        const others = todos.filter(object => !(object.class).includes('selected'));
        todos = [...selected, ...others];

        selected.forEach(item => {
            const removes = document.getElementById(item.id);
            todoList.removeChild(removes);
            drawTodo(item);
        });
    }
    saveTodos();
}