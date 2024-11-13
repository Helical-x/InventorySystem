import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer, Delivery, DeliveryDetail } from '../../models/customer.models';
import { Product } from '../../models/product.models';
import { Warehouse } from '../../models/warehouse.models';
import { DeliveryService } from '../../services/delivery.service';
import { CustomerService } from '../../services/customer.service';
import { ProductsService } from '../../services/products.service';
import { WarehouseService } from '../../services/wharehouse.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-delivery',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [DeliveryService, CustomerService, ProductsService, WarehouseService],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

  delivery: Delivery = {
    deliveryId: 0,
    customerId: 0,
    saleDate: new Date().toISOString().slice(0, 10),
    deliveryDetails: []
  };
  customers: Customer[] = [];
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  newDeliveryDetail: DeliveryDetail = {
    deliveryDetailId: 0,
    productId: 0,
    deliveryId: 0,
    warehouseId: 0,
    deliveryQuantity: 1,
    expectedDate: new Date().toISOString().slice(0, 10),
    actualDate: ''
  };

  constructor(
    private deliveryService: DeliveryService,
    private customerService: CustomerService,
    private productsService: ProductsService,
    private warehouseService: WarehouseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
    this.loadWarehouses();
  }

  loadCustomers(): void {
    this.customerService.getAllCustormers().subscribe(
      response => this.customers = response.items,
      error => console.error('Error al cargar clientes:', error)
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

  addDeliveryDetail(): void {
    if (this.newDeliveryDetail.productId && this.newDeliveryDetail.deliveryQuantity > 0) {
      this.delivery.deliveryDetails?.push({ ...this.newDeliveryDetail });
      this.resetNewDeliveryDetail();
    }
  }

  resetNewDeliveryDetail(): void {
    this.newDeliveryDetail = {
      deliveryDetailId: 0,
      productId: 0,
      deliveryId: 0,
      warehouseId: 0,
      deliveryQuantity: 1,
      expectedDate: new Date().toISOString().slice(0, 10),
      actualDate: ''
    };
  }

  removeDeliveryDetail(index: number): void {
    this.delivery.deliveryDetails?.splice(index, 1);
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.productId === productId);
    return product ? product.productName || 'N/A' : 'N/A';
  }

  getWarehouseName(warehouseId: number): string {
    const warehouse = this.warehouses.find(w => w.warehouseId === warehouseId);
    return warehouse ? warehouse.warehouseName || 'N/A' : 'N/A';
  }

  onSubmit(): void {
    this.deliveryService.createDelivery(this.delivery).subscribe(
      response => {
        console.log('Envío creado:', response);
        this.router.navigate(['/deliveries']); // Redirige a la lista de envíos después de crearla
      },
      error => console.error('Error al crear el envío:', error)
    );
  }
}
