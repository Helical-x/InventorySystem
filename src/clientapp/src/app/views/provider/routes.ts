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
      }

    ]
  }
];

