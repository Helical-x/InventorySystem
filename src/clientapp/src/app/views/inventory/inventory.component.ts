import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Warehouse } from 'src/app/models/warehouse.models';
import { Product } from 'src/app/models/product.models';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductsService } from 'src/app/services/products.service';
import { WarehouseService } from 'src/app/services/wharehouse.service';
import { Inventory } from 'src/app/models/warehouse.models';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [WarehouseService,ProductsService, InventoryService],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  warehouses: Warehouse[] = [];
  selectedWarehouseId: number | null = null;
  selectedWarehouse: Warehouse | null = null;
  inventoryProducts: Inventory[] = [];
  availableProducts: Product[] = [];
  selectedProductId: number | null = null;

  constructor(
    private warehouseService: WarehouseService,
    private inventoryService: InventoryService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses() {
    this.warehouseService.getAllWarehouses().subscribe(
      response => (this.warehouses = response.items),
      error => console.error('Error al cargar almacenes:', error)
    );
  }

  onWarehouseChange() {
    console.log("this.selectedWarehouseId: "+this.selectedWarehouseId);
    this.selectedWarehouse = this.warehouses.find(w => w.warehouseId === this.selectedWarehouseId) || null;
    if (this.selectedWarehouseId) {
      this.loadInventoryProducts(this.selectedWarehouseId);
    }
  }

  loadInventoryProducts(warehouseId: number) {
    console.log("loadInventoryProducts::warehouseId: "+warehouseId);
    this.warehouseService.getInventoryByWarehouseId(warehouseId).subscribe(
      response => {
        this.inventoryProducts = response;
        this.loadAvailableProducts();
      },
      error => console.error('Error al cargar inventario:', error)
    );
  }

  loadAvailableProducts() {
    this.productsService.getAllProducts().subscribe(
      response => {
        // Filtramos los productos que no están en el inventario actual
        const products:Product[] = response.items;
        const inventoryProductIds = this.inventoryProducts.map(item => item.product?.productId);
        console.log("products: "+products);
        console.log("porductsId: "+inventoryProductIds);
        this.availableProducts = products.filter(product => !inventoryProductIds.includes(product.productId));
      },
      error => console.error('Error al cargar productos:', error)
    );
  }

  addProductToInventory() {
    if (this.selectedWarehouseId && this.selectedProductId) {
      const inventory:Inventory = {
        inventoryId: 1,
        productId: 1,
        warehouseId: 1,
        quantityAvailable: 100,
        minimumStockLevel: 20,
        maximumStockLevel: 150,
        reorderPoint: 30
      }
      this.inventoryService.addProductToInventory(this.selectedWarehouseId, this.selectedProductId, inventory).subscribe(
        () => {
          console.log('Producto agregado al inventario');
          this.onWarehouseChange(); // Recarga el inventario después de agregar un producto
        },
        error => console.error('Error al agregar producto al inventario:', error)
      );
    }
  }
}
