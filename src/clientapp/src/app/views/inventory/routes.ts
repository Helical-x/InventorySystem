import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./inventory.component').then(m => m.InventoryComponent),
        data: {
          title: 'Inventario'
        }
      }

    ]
  }
];
