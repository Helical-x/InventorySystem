import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./warehouse.component').then(m => m.WarehouseComponent),
        data: {
          title: 'Almacenes'
        }
      },
      {
        path: 'new-warehouse',
        loadComponent: () => import('./new-warehouse/new-warehouse.component').then(m => m.NewWarehouseComponent),
        data: {
          title: 'Almacenes / Nuevo Almacen'
        }
      }

    ]
  }
];

