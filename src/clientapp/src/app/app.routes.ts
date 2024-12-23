import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'products',
        loadChildren: () => import('./views/product/routes').then((m) => m.routes)
      },
      {
        path: 'warehouses',
        loadChildren: () => import('./views/warehouse/routes').then((m) => m.routes)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/order/routes').then((m) => m.routes)
      },
      {
        path: 'inventories',
        loadChildren: () => import('./views/inventory/routes').then((m) => m.routes)
      },
      {
        path: 'deliverys',
        loadChildren: () => import('./views/delivery/routes').then((m) => m.routes)
      },
      {
        path: 'transfers',
        loadChildren: () => import('./views/transfer-inventory/routes').then((m) => m.routes)
      },
      {
        path: 'clientes',
        loadChildren: () => import('./views/customer/routes').then((m) => m.routes)
      },
      {
        path: 'providers',
        loadChildren: () => import('./views/provider/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
