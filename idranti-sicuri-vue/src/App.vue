<template>
  <TheNavBar />
  <router-view />
</template>

<script>
import TheNavBar from './components/layouts/TheNavBar.vue';








</script>

// Add document title for the app
<script setup>
document.title = 'Idranti - ver Alpha';
</script>


<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

</style>