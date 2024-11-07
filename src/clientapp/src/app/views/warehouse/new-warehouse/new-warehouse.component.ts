import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Warehouse } from 'src/app/models/warehouse.models';
import { WarehouseService } from './../../../services/wharehouse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WarehouseService],
  templateUrl: './new-warehouse.component.html',
  styleUrl: './new-warehouse.component.scss'
})
export class NewWarehouseComponent {
  warehouse: Warehouse = {
    warehouseId: 0,
    warehouseName: null,
    warehouseAddress: null,
    inventories: null
  };

  constructor(
    private warehouseService: WarehouseService,
    private router: Router
  ) {}

  onSubmit() {
    this.warehouseService.createWarehouse(this.warehouse).subscribe(
      response => {
        console.log('Almacén creado:', response);
        this.router.navigate(['/warehouses']);
      },
      error => {
        console.error('Error al crear el almacén:', error);
      }
    );
  }
}
