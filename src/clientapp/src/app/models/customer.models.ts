import { Product } from './product.models';

export interface Customer {
  customerId: number;
  customerName?: string | null;
  customerAddress?: string | null;
  deliveries?: Delivery[] | null;
}
export interface Delivery {
  deliveryId: number;
  customerId: number;
  saleDate: string;
  customer?: Customer;
  deliveryDetails?: DeliveryDetail[] | null;
}
export interface DeliveryDetail {
  deliveryDetailId: number;
  productId: number;
  deliveryId: number;
  warehouseId: number;
  deliveryQuantity: number;
  expectedDate: string;
  actualDate: string;
  product?: Product;
  delivery?: Delivery;
}
