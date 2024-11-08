import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./transfer-inventory.component').then(m => m.TransferInventoryComponent),
        data: {
          title: 'Transferencias'
        }
      }

    ]
  }
];

