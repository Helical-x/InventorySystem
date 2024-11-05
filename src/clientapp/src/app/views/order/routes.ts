import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./order.component').then(m => m.OrderComponent),
        data: {
          title: 'Ordenes de compra'
        }
      }

    ]
  }
];

