import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Order, OrderDetail, Provider } from '../../models/provider.models';
import { Product } from '../../models/product.models';
import { Warehouse } from '../../models/warehouse.models';
import { OrderService } from '../../services/order.service';
import { ProviderService } from '../../services/provider.service';
import { ProductsService } from '../../services/products.service';
import { WarehouseService } from '../../services/wharehouse.service';

import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [OrderService,ProviderService,ProductsService,WarehouseService],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order = {
    orderId: 0,
    providerId: 0,
    orderDate: new Date().toISOString().slice(0, 10),
    prderDetails: []
  };
  providers: Provider[] = [];
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  newOrderDetail: OrderDetail = {
    orderDetailId: 0,
    productId: 0,
    deliveryId: 0,
    warehouseId: 0,
    deliveryQuantity: 1,
    expectedDate: new Date().toISOString().slice(0, 10),
    actualDate: ''
  };
  constructor(
    private orderService: OrderService,
    private providerService: ProviderService,
    private productsService: ProductsService,
    private warehouseService: WarehouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProviders();
    this.loadProducts();
    this.loadWarehouses();
  }

  loadProviders(): void {
    this.providerService.getAllProviders().subscribe(
      response => this.providers = response.items,
      error => console.error('Error al cargar proveedores:', error)
    );
  }
  loadProducts(): void {
    this.productsService.getAllProducts().subscribe(
      response => this.products = response.items,
      error => console.error('Error al cargar productos:', error)
    );
  }
  loadWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe(
      response => this.warehouses = response.items,
      error => console.error('Error al cargar almacenes:', error)
    );
  }
  addOrderDetail(): void {
    if (this.newOrderDetail.productId && this.newOrderDetail.deliveryQuantity > 0) {
      this.order.prderDetails?.push({ ...this.newOrderDetail });
      this.resetNewOrderDetail();
    }
  }
  resetNewOrderDetail(): void {
    this.newOrderDetail = {
      orderDetailId: 0,
      productId: 0,
      deliveryId: 0,
      warehouseId: 0,
      deliveryQuantity: 1,
      expectedDate: new Date().toISOString().slice(0, 10),
      actualDate: ''
    };
  }

  removeOrderDetail(index: number): void {
    this.order.prderDetails?.splice(index, 1);
  }
  // Método para obtener el nombre del producto
  getProductName(productId: number): string {
    const product = this.products.find(p => p.productId === productId);
    return product ? product.productName || 'N/A' : 'N/A';
  }

  getWarehouseName(warehouseId: number): string {
    const warehouse = this.warehouses.find(w => w.warehouseId === warehouseId);
    return warehouse ? warehouse.warehouseName || 'N/A' : 'N/A';
  }
  onSubmit(): void {
    this.orderService.createOrder(this.order).subscribe(
      response => {
        console.log('Orden creada:', response);
        this.router.navigate(['/orders']); // Redirige a la lista de órdenes después de crearla
      },
      error => console.error('Error al crear la orden:', error)
    );
  }
}
