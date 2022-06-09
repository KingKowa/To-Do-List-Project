import _ from 'lodash';
import './style.css';

const section = document.querySelector('section');
const todoText = document.querySelector('input');
const todoListSection = document.querySelector('todo-list');
const clearBtn = document.querySelector('button');

const todoListArr = [
  {
    description: 'Take the car to the mechanic',
    completed: false,
    index: 1,
  },
  {
    description: 'Attend choir practice at 6:00 PM',
    completed: false,
    index: 2,
  },
  {
    description: 'Do some coding challenges on data structures',
    completed: false,
    index: 3,
  },
];

todoListArr.forEach((todo) => {
  const todoContent = `
  <div>
  <input type="checkbox" class=checkbox>
  <span>${todo.description}</span>
  <i class="fas fa-ellipsis-v"></i>
  </div>`;
  document.getElementById('todo-list').innerHTML += todoContent;
});