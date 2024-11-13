import { Product } from './product.models';
export interface Order {
  orderId: number;
  providerId: number;
  orderDate: string;
  provider?: Provider;
  prderDetails?:OrderDetail[] | null;
}
export interface Provider {
  providerId: number;
  providerName?: string | null;
  providerAddress?: string | null;
  orders?: Order[] | null;
}

export interface OrderDetail {
  orderDetailId: number;
  productId: number;
  deliveryId: number;
  warehouseId: number;
  deliveryQuantity: number;
  expectedDate: string;
  actualDate: string;
  product?: Product;
  Order?: Order;
}
