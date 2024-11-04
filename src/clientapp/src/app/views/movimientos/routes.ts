import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./movimientos.component').then(m => m.MovimientosComponent),
        data: {
          title: 'Movimientos'
        }
      }

    ]
  }
];

