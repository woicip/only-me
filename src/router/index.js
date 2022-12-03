import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue';
import UserView from '../views/User.vue';
import LoginView from '../views/Login.vue';
import UnknownUser from '../views/UnknownUser.vue';
import Dashboard from '../views/Dashboard.vue';
import Register from '../views/Register.vue';

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomeView
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserView
  },
  {
    path: '/user',
    name: 'unknown-user',
    component: UnknownUser
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
