import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./transfer.component').then(m => m.TransferComponent),
        data: {
          title: 'Transferencias'
        }
      }

    ]
  }
];

