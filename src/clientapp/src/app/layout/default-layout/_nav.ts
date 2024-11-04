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
    url: '/productos',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Ordenes de Compra',
    url: '/ingresos',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Envios a Clientes',
    url: '/ingresos',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Transferencias',
    url: '/movimientos',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Bodegas',
    url: '/movimientos',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Inventario',
    url: '/movimientos',
    iconComponent: { name: 'cil-storage' }
  },
  {
    title: true,
    name: 'Terceros'
  },
  {
    name: 'Clientes',
    url: '/clientes',
    iconComponent: { name: 'cil-storage' }
  },
  {
    name: 'Proveedores',
    url: '/proveedores',
    iconComponent: { name: 'cil-storage' }
  }

];
