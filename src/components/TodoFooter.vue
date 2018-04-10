<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{itemsLeft}}</strong>
      {{itemSingularOrPlural}} left
    </span>
    
    <ul class="filters">
      <li>
        <router-link to="/" :class="{ selected: !isActive && !isCompleted }">
          All
        </router-link>
      </li>
      <li>
        <router-link to="/active" :class="{ selected: isActive }">Active</router-link>
      </li>
      <li>
        <router-link to="/completed" :class="{ selected: isCompleted }">Completed</router-link>
      </li>
    </ul>
    <button class="clear-completed" @click="clearCompleted"></button>
  </footer>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: ['itemsLeft', 'clearCompleted', 'currentView'],
    computed: {
      itemSingularOrPlural(): string{
        return this.itemsLeft === 1 ? 'item' : 'items'
      },
      isActive(): boolean{
        return this.currentView === 'active';
      },
      isCompleted(): boolean{
        return this.currentView === 'completed';
      }
    }
  });
</script>

