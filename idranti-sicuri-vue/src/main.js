import { createApp } from 'vue'
import App from './App.vue'
import TheNavBar from './components/TheNavBar.vue'
import Map from './components/Map.vue'

const app = createApp(App)
app.component('TheNavBar', TheNavBar)
app.component('Map', Map)
app.mount('#app')
