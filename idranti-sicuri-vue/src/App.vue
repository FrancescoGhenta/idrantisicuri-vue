<template>
  <TheNavBar />
  <Map />
</template>

<script>
import Map from './components/Map.vue';
import TheNavBar from './components/TheNavBar.vue';






</script>

// Add document title for the app
<script setup>
document.title = 'Idranti - ver Alpha';
</script>


<style>
body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#mappa {
  height: 95vh;
  position: relative;
}


</style>