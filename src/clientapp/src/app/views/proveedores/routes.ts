import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./proveedores.component').then(m => m.ProveedoresComponent),
        data: {
          title: 'Proveedores'
        }
      }

    ]
  }
];

