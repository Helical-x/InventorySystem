import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./product.component').then(m => m.ProductComponent),
        data: {
          title: 'Productos'
        }
      }

    ]
  }
];

