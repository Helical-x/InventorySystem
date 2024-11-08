import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./customer.component').then(m => m.ClientComponent),
        data: {
          title: 'Clientes'
        }
      },
      {
        path: 'new-customer',
        loadComponent: () => import('./new-customer/new-customer.component').then(m => m.NewCustomerComponent),
        data: {
          title: 'Clientes / Nuevo cliente'
        }
      },
      {
        path: 'edit-product/:productId',
        loadComponent: () => import('./edit-customer/edit-customer.component').then(m => m.EditCustomerComponent),
        data: {
          title: 'Clientes / Editar Cliente'
        }
      }

    ]
  }
];

