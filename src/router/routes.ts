import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import CustomersContainer from '@/views/customers/CustomersContainer.vue'
import SuppliersContainer from '@/views/suppliers/SuppliersContainer.vue'
import CreateCustomer from '@/views/customers/CreateCustomer.vue'
import CreateSupplier from '@/views/suppliers/CreateSupplier.vue'
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/customers',
    name: 'Customers',
    component: CustomersContainer,
  }
  ,
  {
    path: '/customers/create',
    name: 'CreateCustomer',
    component: CreateCustomer,
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: SuppliersContainer,
  },
  {
    path: '/suppliers/create',
    name: 'CreateSupplier',
    component: CreateSupplier,
  }
];

export default routes;