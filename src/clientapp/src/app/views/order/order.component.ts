import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, UtilitiesModule, PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {OrderService } from '../../services/order.service';
import { Order } from '../../models/provider.models';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
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
  providers: [OrderService],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  public getOrders() {
    this.orderService.getOrders(this.pageNumber, this.pageSize).subscribe(
      response => {
        console.log(response);
        this.orders = response.items;
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
    this.getOrders();
  }

  public newOrder() {
    this.router.navigate(["new-order"], { relativeTo: this.route });
  }

  public editOrder(orderId: number) {
    this.router.navigate([`edit-order/`, orderId], { relativeTo: this.route });
  }
}
