export type RouteViews = 'all' | 'completed' | 'active';

export interface Todo {
  title: string;
  completed: boolean;
}

export interface AppState {
  newTodoTitle: string;
  currentView?: RouteViews;
  todos: Todo[];
}
