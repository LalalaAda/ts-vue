<template>
  <div>
    <BaseInputText v-model="newTodoText" placeholder="New Todo" @keydown.enter="addTodo" />

    <ul v-if="todos.length">
      <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" @remove="removeTodo" />
    </ul>
    <p v-else>
      Nothing left in the list. Add a new todo in the input above.
    </p>
  </div>
</template>

<script lang="ts">
import BaseInputText from '../components/BaseInputText.vue'
import TodoListItem from '../components/TodoListItem.vue'

import Vue from 'vue'

let nextTodoId: number = 1;
export default Vue.extend({
  components: {
    BaseInputText, TodoListItem
  },
  data(){
    return {
      newTodoText: '',
      todos: [
        { id: nextTodoId++, text: 'Learn Vue' },
        { id: nextTodoId++, text: 'Learn about single-file components' },
        { id: nextTodoId++, text: 'Fall in OK' }
      ]
    }
  },
  methods: {
    addTodo(): void{
      const trimmedText = this.newTodoText.trim();
      if(trimmedText){
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText
        });
        this.newTodoText = '';
      }else{
        console.log('非法输入');
      }
    },
    removeTodo(idToRemove: number): void{
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove;
      });
    }
  }
});
</script>
