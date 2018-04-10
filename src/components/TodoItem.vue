<template>
  <li :class="{ completed: todo.completed }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="todo.completed">
      <label>{{todo.title}}</label>
      <button class="destroy" @click="$emit('removeSlef')"></button>
    </div>
    <input type="text" class="edit" value="Create a TodoMVC template">
  </li>
</template>

<script lang="ts">
  export default {
    props: ['todo']
  };
</script>
