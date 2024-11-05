export interface Order {
  orderId: number;
  providerId: number;
  orderDate: string;
  provider?: Provider;
}
export interface Provider {
  providerId: number;
  providerName?: string | null;
  providerAddress?: string | null;
  orders?: Order[] | null;
}
