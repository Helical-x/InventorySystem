import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./ingresos.component').then(m => m.IngresosComponent),
        data: {
          title: 'Ordenes de Compra'
        }
      }

    ]
  }
];

