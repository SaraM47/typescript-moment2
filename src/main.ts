import { TodoList } from './todolist';
import { Todo } from './todo';

const todoList = new TodoList();

// Get form and input elements
const form = document.getElementById('todoForm') as HTMLFormElement;
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement;
const todoUl = document.getElementById('todoList') as HTMLUListElement;

// Get elements for error and confirmation messages
const errorMessageDiv = document.getElementById('errorMessage') as HTMLDivElement;
const confirmationMessageDiv = document.getElementById('confirmationMessage') as HTMLDivElement;

const template = document.getElementById('todoItemTemplate') as HTMLTemplateElement;

function renderTodos() {
  todoUl.innerHTML = '';
  
  // Sort tasks by priority (1 is highest, 3 is lowest)
  const sortedTodos = todoList.getTodos().sort((a, b) => a.priority - b.priority);
  
  sortedTodos.forEach((todo: Todo, index: number) => {
    // Clone the <template> content
    const clone = template.content.cloneNode(true) as HTMLElement;
    const li = clone.querySelector('li')!;
    const checkbox = li.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const span = li.querySelector('span')!;
    const datesDiv = li.querySelector('.todo-dates')!;
    const editBtn = li.querySelector('.edit-btn')!;
    const deleteBtn = li.querySelector('.delete-btn')!;

    // Set task data
    if (todo.completed) {
      li.classList.add('completed');
    }

    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todoList.markTodoCompleted(index);
      renderTodos();
    });

    span.textContent = `[${todo.priority}] ${todo.task}`;
    span.style.textDecoration = todo.completed ? 'line-through' : 'none';

    // Show creation date and (if available) completion date
    const createdDate = new Date(todo.createdAt).toLocaleString();
    const completedDate = todo.completedAt ? new Date(todo.completedAt).toLocaleString() : null;
    datesDiv.innerHTML = `
      <small>Skapad: ${createdDate}</small><br>
      ${completedDate ? `<small>Avklarad: ${completedDate}</small>` : ''}
    `;

    // Edit task logic
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

    // Delete task logic
    deleteBtn.addEventListener('click', () => {
      todoList.removeTodo(index);
      renderTodos();
      showConfirmationMessage('Uppgiften har tagits bort!');
    });

    // Add item to the list
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
    errorMessageDiv.textContent = 'Fyll i fältet! Kontrollera att du har skrivit uppgiften och valt prioriteten.';
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
