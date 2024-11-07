import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./provider.component').then(m => m.ProviderComponent),
        data: {
          title: 'Proveedores'
        }
      },
      {
        path: 'new-provider',
        loadComponent: () => import('./new-provider/new-provider.component').then(m => m.NewProviderComponent),
        data: {
          title: 'Productos / Nuevo Productos'
        }
      },
      {
        path: 'edit-provider/:providerId',
        loadComponent: () => import('./edit-provider/edit-provider.component').then(m => m.EditProviderComponent),
        data: {
          title: 'Productos / Editar Producto'
        }
      }

    ]
  }
];

