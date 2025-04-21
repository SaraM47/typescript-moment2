import { Todo } from './todo';

export class TodoList {
  private todos: Todo[] = [];

  constructor() {
    this.loadFromLocalStorage(); // Load todos from local storage when the TodoList is initialized
  }

  // Adds a new todo to the list with the provided task and priority
  addTodo(task: string, priority: number): boolean {
    if (!task.trim() || ![1, 2, 3].includes(priority)) {
      return false; // Return false if the task is invalid or priority is not between 1 and 3
    }

    const newTodo: Todo = {
      task,
      completed: false,
      priority: priority as 1 | 2 | 3, // Ensure the priority is valid (1, 2, or 3)
      createdAt: new Date().toISOString()  // Store the creation date of the task
    };

    this.todos.push(newTodo); // Add the new todo to the list
    this.saveToLocalStorage(); // Save the updated todo list to local storage
    return true; 
  }

  // Mark a specific todo as completed or not completed
  markTodoCompleted(index: number): void {
    if (this.todos[index]) {
      this.todos[index].completed = !this.todos[index].completed; // Toggle completion status
      this.todos[index].completedAt = this.todos[index].completed ? new Date().toISOString() : undefined; // Record the completion date if completed
      this.saveToLocalStorage();
    }
  }

  // Edit an existing todo (task and priority)
  editTodo(index: number, newTask: string, newPriority: number): void {
    if (!newTask.trim() || ![1, 2, 3].includes(newPriority)) return; // Validate the new task and priority
  
    const todo = this.todos[index];
    if (todo) {
      todo.task = newTask; // Update the task
      todo.priority = newPriority as 1 | 2 | 3;
      this.saveToLocalStorage();
      
      // Bekräftelse efter redigering
      alert("Uppgiften har redigerats.");
    }
  }  

  // Remove a todo from the list by index
  removeTodo(index: number): void {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1); // Remove the todo from the list
      this.saveToLocalStorage();
    }
  }

  // Get all todos from the list
  getTodos(): Todo[] {
    return this.todos;
  }

  // Save the current todo list to local storage
  saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Load the todo list from local storage
  loadFromLocalStorage(): void {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data); // Parse the saved data and assign it to the todos array
    }
  }
}
