/*
* Interface defining the structure of a todo item
* Including task description, completion status, 
* priority level, creation date, and optional completion date.
*/
export interface Todo {
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;
    createdAt: string;
    completedAt?: string;
  }
  