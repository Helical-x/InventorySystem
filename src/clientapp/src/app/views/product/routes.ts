import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./product.component').then(m => m.ProductComponent),
        data: {
          title: 'Productos'
        }
      },
      {
        path: 'new-product',
        loadComponent: () => import('./new-product/new-product.component').then(m => m.NewProductComponent),
        data: {
          title: 'Productos / Nuevo Productos'
        }
      },
      {
        path: 'edit-product/:productId',
        loadComponent: () => import('./edit-product/edit-product.component').then(m => m.EditProductComponent),
        data: {
          title: 'Productos / Editar Producto'
        }
      }
    ]
  }
];

