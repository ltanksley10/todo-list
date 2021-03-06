document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleClickDeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', handleClearAll);
let list = document.getElementById('listItems');
let input = document.querySelector('input');

let saved = window.localStorage.getItem(input.value);

if (saved) {
	list.innerHTML = saved;
}

//Event handlers
function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '') {
        addTodo(input.value);
    }
    input.value = '';
    window.localStorage.setItem(input.value, list.innerHTML);
}

function addTodo(todo) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="checkButton"><i class="fas fa-check-square"></i></button>
        <button name="deleteButton"><i class="fas fa-trash"></i></button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);
}

function handleClickDeleteOrCheck(e) {
    if (e.target.name == 'checkButton') {
        checkTodo(e);
    } else if (e.target.name == 'deleteButton') {
        deleteTodo(e);
    }
}

function checkTodo(e) {
    let item = e.target.parentNode;
    if (item.style.textDecoration == 'line-through') {
        item.style.textDecoration = 'none';
    } else {
        item.style.textDecoration = 'line-through';
    }
}

function deleteTodo(e) {
    let item = e.target.parentNode;
    item.addEventListener('transitionend', function () {
        item.remove();
    });
    item.classList.add('todo-list-item-fall');
}

function handleClearAll(e) {
    document.querySelector('ul').innerHTML = '';
    window.localStorage.clear();
}