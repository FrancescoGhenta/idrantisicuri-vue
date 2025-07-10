<template>
   <nav id="navbar">
    <div id="navbar-left"><router-link to="/">Idranti Sicuri VR</router-link></div>
    <div id="navbar-right" v-if="$route.path !== '/add-idr'"><router-link to="/add-idr"><BaseButton  class="btn-primary">Segnala idrante</BaseButton></router-link></div>
  </nav>
</template>

<script></script>

<style scoped>
/* navbar */
#navbar {
    height: 5vh;
    background-color: #bb0000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
}

#navbar-left {
    font-weight: bold;
    color: #f0f0f0;
    font-size: 1.2rem;
}

#navbar-left a {
    position: relative;
    text-decoration: none;
    color: #f0f0f0;
}

#navbar-right {
    display: flex;
    justify-content: center;
    align-items: center;
}


</style>