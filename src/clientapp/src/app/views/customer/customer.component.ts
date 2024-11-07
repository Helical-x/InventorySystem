import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, UtilitiesModule,PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RouterLink,ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './../../services/customer.service';
import { Customer } from './../../models/customer.models';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
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
  providers: [CustomerService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class ClientComponent {

  customers:Customer[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages:number = 0;

  constructor(
    private customerService:CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ){

  };

  public getCustomers(){
    this.customerService.getCustomers(this.pageNumber,this.pageSize).subscribe(
      response => {
        console.log(response);
        this.customers = response.items;
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
    this.getCustomers();
  }

  public newCustomer(){
    this.router.navigate(["new-customer"], { relativeTo: this.route });
  }
  public editCustomer(customerId:number){
    this.router.navigate([`edit-customer/`,customerId], { relativeTo: this.route });
  }

}
