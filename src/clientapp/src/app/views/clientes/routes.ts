import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./clientes.component').then(m => m.ClientesComponent),
        data: {
          title: 'Clientes'
        }
      }

    ]
  }
];

