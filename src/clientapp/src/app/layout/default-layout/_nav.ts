import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Inventario'
  },
  {
    name: 'Productos',
    url: '/products',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Ordenes de Compra',
    url: '/orders',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Envios a Clientes',
    url: '/deliverys',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Transferencias',
    url: '/transfers',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Almacenes',
    url: '/warehouses',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Inventario',
    url: '/inventories',
    iconComponent: { name: 'cil-storage' }
  },
  {
    title: true,
    name: 'Terceros'
  },
  {
    name: 'Clientes',
    url: '/clients',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Proveedores',
    url: '/providers',
    iconComponent: { name: 'cil-storage' }
  }

];
