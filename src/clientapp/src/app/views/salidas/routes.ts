import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./salidas.component').then(m => m.SalidasComponent),
        data: {
          title: 'Salidas'
        }
      }

    ]
  }
];

