export interface Product {
  productId: number;
  productCode?: string | null;
  barcode?: string | null;
  productName?: string | null;
  productDescription?: string | null;
  productCategory?: string | null;
  reorderQuantity: number;
  productWeight: number;
  productHeight: number;
  productWidth: number;
  productDepth: number;
}
