<template>
  <button><slot></slot></button>
</template>

<style scoped>
button {
  color: #fff;
  background-color: var(--primary-color);
  padding: 5px 15px;
  border-radius: 3px;
}

button:hover {
  background-color: var(--primary-dark-color);
}
</style>
