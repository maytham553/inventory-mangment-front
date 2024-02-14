import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import type { UserType } from '../Types'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const userType: UserType | undefined = authStore.getUserType;
  const isLoggedIn = authStore.isLoggedIn;
  const isAdmin = userType === 'Admin';
  const isUser = userType === 'User';
  const isSuperAdmin = userType === 'SuperAdmin';

  const publicRoutes = ['Login'];
  const userRoutes = ['Home', 'Customers', 'Suppliers', 'CreateCustomer', 'CreateSupplier' ,  'CreateExpense'];
  const adminRoutes = ['Products', 'RawMaterials', 'Expenses'];
  const superAdminRoutes = ['Dashboard'];

  const isPublicRoute = publicRoutes.includes(to.name as string);
  const isAdminRoute = adminRoutes.includes(to.name as string);
  const isUserRoute = userRoutes.includes(to.name as string);
  const isSuperAdminRoute = superAdminRoutes.includes(to.name as string);
  

  if (!isLoggedIn && !isPublicRoute) {
    return next({ name: 'Login' });
  }

  if (isLoggedIn && to.name === 'Login') {
    return next({ name: 'Home' });
  }

  if (isLoggedIn && (!isAdmin && !isSuperAdmin ) && isAdminRoute) {
    return next({ name: 'Home' });
  }

  if (isLoggedIn && !isSuperAdmin && isSuperAdminRoute) {
    return next({ name: 'Home' });
  }

  if (isLoggedIn && !isAdminRoute && !isUserRoute && !isSuperAdminRoute) {
    return next({ name: 'Home' });
  }

  next();
});

export default router
