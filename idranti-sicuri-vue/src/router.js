import { createRouter, createWebHistory } from 'vue-router';
import Map from './pages/Map.vue';
import Details from './pages/Details.vue';
import NotFound from './pages/NotFound.vue';
import AddIdr from './pages/AddIdr.vue';
import EditIdr from './pages/EditIdr.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Map , name: 'Map'},
    { path: '/details/:id', component: Details, props: true, name: 'Details' },
    { path: '/add-idr', component: AddIdr, name: 'AddIdr' },
    { path: '/edit-idr/:id', component: EditIdr, props: true, name: 'EditIdr' },
    { path: '/:notFound(.*)*', component: NotFound, name: 'NotFound' }
  ]
});

export default router;