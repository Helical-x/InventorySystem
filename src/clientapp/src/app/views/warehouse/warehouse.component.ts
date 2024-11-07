
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, UtilitiesModule,PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RouterLink,ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Warehouse } from './../../models/warehouse.models';
import { WarehouseService } from './../../services/wharehouse.service';

import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    UtilitiesModule,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    RouterLink,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [WarehouseService],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss'
})
export class WarehouseComponent implements OnInit {
  warehouses:Warehouse[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages:number = 0;
  constructor(
    private warehouseService:WarehouseService,
    private router: Router,
    private route: ActivatedRoute
  ){

  }
  ngOnInit(): void {
    this.getWarehouses();
  }
;

  public getWarehouses(){
    this.warehouseService.getWarehouses(this.pageNumber,this.pageSize).subscribe(
      response => {
        console.log(response);
        this.warehouses = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      },
      error => {
        console.error(error);
      }
    );
  }
  onPageChange(event: any) {
    console.log(event);
    this.pageNumber = event.pageIndex;
    this.getWarehouses();
  }

  public newWarehouse(){
    this.router.navigate(["new-warehouse"], { relativeTo: this.route });
  }

}
