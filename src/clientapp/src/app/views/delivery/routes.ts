import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./delivery.component').then(m => m.DeliveryComponent),
        data: {
          title: 'Envios'
        }
      }

    ]
  }
];

