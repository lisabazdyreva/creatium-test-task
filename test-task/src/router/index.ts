import { createRouter, createWebHistory } from 'vue-router';
import LogicView from '../views/LogicView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/logic',
    },
    {
      path: '/logic',
      name: 'logic',
      component: LogicView,
    },
  ],
});

export default router;
