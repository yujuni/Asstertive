const todoForm = document.querySelector('form#todo-form');
const todoInput = todoForm.querySelector('input:first-child');
const todoList = document.querySelector('ul#todo-list');

let todos = [];
const TODOS = 'todos';

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
    const deleteBtn = document.createElement('div');
    const deleteIcon = document.createElement('i');

    li.id = newTodo.id;
    span.innerText = newTodo.text;
    deleteIcon.className = 'fa-solid fa-trash';

    deleteBtn.appendChild(deleteIcon);
    li.append(span, deleteBtn);
    todoList.appendChild(li);

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
        text: todo,
    }
    drawTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
}

todoForm.addEventListener('submit', handleSubmit);

const savedTodos = localStorage.getItem(TODOS);

if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);
    todos.forEach(item => {
        drawTodo(item);
    });
}