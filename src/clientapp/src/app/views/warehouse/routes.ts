import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./warehouse.component').then(m => m.WarehouseComponent),
        data: {
          title: 'Boodegas'
        }
      }

    ]
  }
];

