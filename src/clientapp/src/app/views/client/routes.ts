import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./client.component').then(m => m.ClientComponent),
        data: {
          title: 'Clientes'
        }
      }

    ]
  }
];

