import { Product } from './product.models';
export interface Warehouse {
  warehouseId: number;
  warehouseName?: string | null;
  warehouseAddress?: string | null;
  inventories?: Inventory[] | null;
}

export interface Inventory {
  inventoryId: number;
  productId: number;
  warehouseId: number;
  quantityAvailable: number;
  minimumStockLevel: number;
  maximumStockLevel: number;
  reorderPoint: number;
  product?: Product;
  warehouse?: Warehouse;
}
