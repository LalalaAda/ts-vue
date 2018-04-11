<template>
  <input type="text" class="input" :value="value" v-on="listeners">
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: { type: String, default: '' }
  },
  computed: {
    listeners(): any{
      return {
        ...this.$listeners,
        input: (event: any) => this.$emit('input', event.target.value)
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  @import '../variables.scss';

  .input{
    width: 100%;padding: 8px 10px;
    border: 1px solid $vue-blue;
  }
</style>


