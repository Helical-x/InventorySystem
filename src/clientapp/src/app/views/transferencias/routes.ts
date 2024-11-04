import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./transferencias.component').then(m => m.TransferenciasosComponent),
        data: {
          title: 'Transferencias'
        }
      }

    ]
  }
];

