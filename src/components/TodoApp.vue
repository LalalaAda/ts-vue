<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input type="text" class="new-todo" v-model="newTodoTitle" 
        @keyup.enter="createTodo()" placeholder="What needs to be done?"
        autofocus>
    </header>
    <section class="main" v-if="todos.length">
      <input type="checkbox" class="toggle-all">
      <label for="toggle-all" @click="toggleAll">Mark all as complete</label>
      <ul class="todo-list">
        <div v-for="(todo, index) in todosInView" :key="todo.title">
          <todo-item :todo="todo" @toggleCompleted="toggleCompleted(index)"
            @removeSelf="removeTodo(index)" />
        </div>
      </ul>
    </section>
    <todo-footer v-if="todos.length" :itemsLeft="remaining.length"
     :currentView="currentView" :clearCompleted="clearCompleted" />
  </section>
</template>

<script lang="ts">
  import TodoFooter from './TodoFooter.vue'
  import TodoItem from './TodoItem.vue'

  import Vue from 'vue'
  import { AppState, Todo } from '../models'

  export default Vue.extend({
    components: {
      TodoItem, TodoFooter
    },

    props: ['currentView'],

    data(){
      const initialState: AppState = {
        newTodoTitle: '',
        todos: [
          { completed: false, title: 'Use Vue with TypeScript' }
        ]
      };
      return initialState;
    },
    methods: {
      createTodo(){
        const title = this.newTodoTitle.trim();
        if(!title){ return; }

        this.todos.push({
          completed: false,
          title
        });

        this.newTodoTitle = '';
      },
      removeTodo(index: number){
        if(index >= this.todos.length){
          throw new Error('Index deletion at ${index} greater than ${this.todos.length}');
        }

        this.todos.splice(index, 1);
      },
      toggleCompleted(index: number){
        const current = this.todos[index];
        this.todos.splice(index, 1, {
          ...current,
          completed: !current.completed
        });
      },
      clearCompleted(){
        this.todos = this.remaining;
      },
      toggleAll(){
        const stateForAll = this.completed.length !== this.todos.length;
        for(const todo of this.todos){
          todo.completed = stateForAll;
        }
      }

    },

    computed: {
      todosInView(): Todo[]{
        switch (this.currentView) {
          case 'completed':
            return this.completed;
          case 'active':
            return this.remaining;
          case 'all':
          default:
            return this.todos;
        }
      },
      completed(): Todo[]{
        return this.todos.filter(isCompleted);
      },
      remaining(): Todo[]{
        return this.todos.filter(isNotCompleted);
      }
    }

  });

  function isCompleted(todo: Todo) {
    return todo.completed;
  }
  function isNotCompleted(todo: Todo) {
    return !todo.completed;
  }
</script>

