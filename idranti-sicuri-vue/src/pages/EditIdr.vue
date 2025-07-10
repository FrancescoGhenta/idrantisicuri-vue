<template>
    <div>
      <h2>Modifica idrante</h2>
      <p>Modifica l'idrante {{ id }}</p>
      <base-button class="btn-primary" @click="goHome">Torna alla home</base-button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditIdr',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        goHome() {
            this.$router.push('/');
        }
    }
  }
  </script>

  <style scoped>
  div {
    text-align: center;
    margin-top: 100px;
  }

  h2 {
    font-size: 7rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 2rem;
  }
  </style>