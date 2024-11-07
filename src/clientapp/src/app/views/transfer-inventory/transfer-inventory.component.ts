import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InventoryService } from '../../../app/services/inventory.service';
import { WarehouseService } from '../../../app/services/wharehouse.service';
import { Inventory, Warehouse } from 'src/app/models/warehouse.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-inventory',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [InventoryService, WarehouseService],
  templateUrl: './transfer-inventory.component.html',
  styleUrls: ['./transfer-inventory.component.scss']
})
export class TransferInventoryComponent implements OnInit {
  warehouses: Warehouse[] = [];
  originWarehouseId: number | null = null;
  destinationWarehouseId: number | null = null;
  productsInOrigin: Inventory[] = [];
  selectedProduct: Inventory | null = null;
  transferQuantity: number = 0;

  constructor(
    private warehouseService: WarehouseService,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.warehouseService.getAllWarehouses().subscribe(
      response => this.warehouses = response.items,
      error => console.error('Error al cargar almacenes:', error)
    );
  }

  onOriginWarehouseChange(): void {
    if (this.originWarehouseId) {
      this.inventoryService.getInventoryByWarehouseId(this.originWarehouseId).subscribe(
        products => {
          this.productsInOrigin = products;
          this.selectedProduct = null;
          this.transferQuantity = 0;
        },
        error => console.error('Error al cargar productos del almacén de origen:', error)
      );
    }
  }

  onProductChange(): void {
    this.transferQuantity = 1; // Valor mínimo por defecto
  }

  onSubmit(): void {
    if (this.originWarehouseId && this.selectedProduct && this.destinationWarehouseId) {
      const transferData = {
        originInventoryId: this.selectedProduct.inventoryId,
        quantity: this.transferQuantity,
        destinationWarehouseId: this.destinationWarehouseId
      };
      this.inventoryService.transferInventory(transferData).subscribe(
        response => {
          console.log('Transferencia realizada con éxito:', response);
          this.router.navigate(['/inventory']); // Navegar a la vista de inventario
        },
        error => {
          console.error('Error al realizar la transferencia:', error);
        }
      );
    }
  }
}
