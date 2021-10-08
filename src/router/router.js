import { createRouter, createWebHistory } from 'vue-router';
import TrafficLight from '../components/TrafficLight.vue';

const routes = [
  {
    path: '/',
    redirect: {name: 'green'}
  },
  {
    path: '/green',
    component: TrafficLight,
    name: 'green',
  }, 
  {
    path: '/red',
    component: TrafficLight,
    name: 'red'
  }, 
  {
    path: '/yellow',
    component: TrafficLight,
    name: 'yellow'
  }, 
  {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'green'}
  }, 
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router;