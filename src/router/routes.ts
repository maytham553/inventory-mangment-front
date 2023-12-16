import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import CustomersContainer from '@/views/customers/CustomersContainer.vue'
import SuppliersContainer from '@/views/suppliers/SuppliersContainer.vue'
import CreateCustomer from '@/views/customers/CreateCustomer.vue'
import CreateSupplier from '@/views/suppliers/CreateSupplier.vue'
import ProductsContainer from '@/views/products/ProductsContainer.vue'
import RawMaterialsContainer from '@/views/rawMaterials/RawMaterialsContainer.vue'
import ExpensesContainer from '@/views/expenses/ExpensesContainer.vue'
import CreateExpense from '@/views/expenses/CreateExpense.vue';

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
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsContainer,
  },
  {
    path: '/rawMaterials',
    name: 'RawMaterials',
    component: RawMaterialsContainer
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: ExpensesContainer,
  },
  {
    path: '/expenses/create',
    name: 'CreateExpense',
    component: CreateExpense,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

export default routes;