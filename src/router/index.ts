import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicRoutes = ['Login'];
  const authorizedRoutes = ['Home', 'Customers', 'Suppliers', 'CreateCustomer', 'CreateSupplier'];
  const isPublicRoute = publicRoutes.includes(to.name as string);
  const isAuthorizedRoute = authorizedRoutes.includes(to.name as string);
  const isLoggedIn = localStorage.getItem('token');
  if (isPublicRoute && isLoggedIn) {
    return next({ name: 'Home' });
  }
  if (isAuthorizedRoute && !isLoggedIn) {
    return next({ name: 'Login' });
  }
  next();
});

export default router
