<template>
  <div v-if="errors && errors.length" class="errors">
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: {
    errors: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.errors {
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #ffcdd2;
}

.errors ul {
  margin: 0;
  padding-left: 1.5rem;
}
</style>
