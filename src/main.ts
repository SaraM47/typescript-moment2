import { TodoList } from './todolist';

const todoList = new TodoList();

// Get form and input elements
const form = document.getElementById('todoForm') as HTMLFormElement;
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement;
const todoUl = document.getElementById('todoList') as HTMLUListElement;

// Get elements for error and confirmation messages
const errorMessageDiv = document.getElementById('errorMessage') as HTMLDivElement;
const confirmationMessageDiv = document.getElementById('confirmationMessage') as HTMLDivElement;

function renderTodos() {
  todoUl.innerHTML = '';
  
  // Sort tasks by priority (1 is highest, 3 is lowest)
  const sortedTodos = todoList.getTodos().sort((a, b) => a.priority - b.priority);
  
  sortedTodos.forEach((todo, index) => {
    const li = document.createElement('li');

    // Add 'completed' class if the task is done
    if (todo.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todoList.markTodoCompleted(index);
      renderTodos();
    });

    const span = document.createElement('span');
    span.textContent = `[${todo.priority}] ${todo.task}`;
    span.style.textDecoration = todo.completed ? 'line-through' : 'none';

    // Show creation date and (if available) completion date
    const createdDate = new Date(todo.createdAt).toLocaleString();
    const completedDate = todo.completedAt ? new Date(todo.completedAt).toLocaleString() : null;

    const datesDiv = document.createElement('div');
    datesDiv.className = 'todo-dates';
    datesDiv.innerHTML = `
      <small>Skapad: ${createdDate}</small><br>
      ${completedDate ? `<small>Avklarad: ${completedDate}</small>` : ''}
    `;

    // Creates edit button with Font Awesome icon
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>'; 
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => {
      const newTask = prompt('Ändra uppgift:', todo.task);
      const newPriority = parseInt(prompt('Ny prioritet (1–3):', todo.priority.toString()) || '');
      if (newTask && [1, 2, 3].includes(newPriority)) {
        todoList.editTodo(index, newTask, newPriority);
        renderTodos();
        showConfirmationMessage('Uppgiften har redigerats!');
      } else {
        alert('Ogiltiga värden!');
      }
    });

    // Create delete button with Font Awesome icon
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.classList.add('delete-btn'); 
    deleteBtn.addEventListener('click', () => {
      todoList.removeTodo(index);
      renderTodos();
      showConfirmationMessage('Uppgiften har tagits bort!');
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(datesDiv);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoUl.appendChild(li);
  });
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const priority = parseInt(prioritySelect.value);
  
  const success = todoList.addTodo(task, priority);
  if (!success) {
    // Show error message if the values are invalid
    errorMessageDiv.textContent = 'Felaktiga värden! Kontrollera uppgiften och prioriteten.';
    errorMessageDiv.style.display = 'block';
    return;
  }

  // Hide error message if the input was valid
  errorMessageDiv.style.display = 'none'; 
  taskInput.value = '';
  renderTodos();
});

function showConfirmationMessage(message: string) {
  confirmationMessageDiv.textContent = message;
  confirmationMessageDiv.style.display = 'block';
  setTimeout(() => {
    confirmationMessageDiv.style.display = 'none';
  }, 3000); // Hide confirmation after 3 seconds
}

renderTodos();
