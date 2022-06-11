import './style.css';

const todoListSection = document.getElementById('todo-list');
const todoText = document.querySelector('input');

class TodoObject {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

const removeTodoList = (todo) => {
  todoListSection.removeChild(todo);
  let count = 0;
  const localdata = JSON.parse(localStorage.getItem('todolist'));
  const data = Array.from(localdata).filter((i) => i.completed === false);
  data.map((i) => (i.index = count+= 1));
  localStorage.setItem('todolist', JSON.stringify(data));
};

const editTodoList = (todoContainer, todoDescription) => {
  const editInputText = document.createElement('input');
  editInputText.type = 'text';
  editInputText.classList = 'editInput';
  editInputText.value = todoDescription.textContent;
  todoContainer.replaceChild(editInputText, todoDescription);
  editInputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const todoContainers = document.querySelectorAll('.todoContainer');
      const storageList = JSON.parse(localStorage.getItem('todolist'));
      for (let i = 0; i < todoContainers.length; i += 1) {
        if (todoContainers[i].classList.contains('clickedcheckbox')) {
          storageList[i].description = editInputText.value;
          localStorage.setItem('todolist', JSON.stringify(storageList));
        }
      }
      editInputText.parentElement.classList.remove('clickedcheckbox');
      todoContainer.replaceChild(todoDescription, editInputText);
      todoDescription.textContent = editInputText.value;
    }
  });
};

const todoListArr = [];

const addTodo = (todoDescription) => {
  const todoContainer = document.createElement('div');
  todoContainer.className = 'todoContainer';
  todoContainer.innerHTML += `
  <input type="checkbox" class="checkbox">
  <span>${todoDescription}</span>
  <i class="fas fa-ellipsis-v"></i>
  <i class="fas fa-trash-alt"></i>
  </div>`;
  todoListSection.appendChild(todoContainer);

  const checkBox = document.querySelectorAll('.checkbox');
  checkBox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('clickedcheckbox');
      i.nextElementSibling.classList.toggle('checkTodo');
      i.parentElement.lastElementChild.classList.toggle('trashbin-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('rmv-edit');
    });
  });

  const listObject = new TodoObject(todoDescription, false, checkBox.length);
  todoListArr.push(listObject);
  localStorage.setItem('todolist', JSON.stringify(todoListArr));

  const editIcon = document.querySelectorAll('.fa-ellipsis-v');
  editIcon.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('clickedcheckbox');
      editTodoList(todoContainer, i.previousElementSibling);
    });
  });

  const removeIcon = document.querySelectorAll('.fa-trash-alt');
  removeIcon.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('clickedcheckbox');
      removeTodoList(i.parentElement);
    });
  });
};

todoText.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && todoText.value) {
    event.preventDefault();
    addTodo(todoText.value);
    todoText.value = null;
  }
});