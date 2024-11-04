import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./productos.component').then(m => m.ProductosComponent),
        data: {
          title: 'Productos'
        }
      }

    ]
  }
];
