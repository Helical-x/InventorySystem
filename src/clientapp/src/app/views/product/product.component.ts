import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, UtilitiesModule,PageItemDirective, PageLinkDirective, PaginationComponent } from '@coreui/angular';
import { RouterLink,ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/models/product.models';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
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
  providers: [ProductsService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  products:Product[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages:number = 0;

  constructor(
    private productsService:ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ){

  };

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(){
    this.productsService.getProducts(this.pageNumber,this.pageSize).subscribe(
      response => {
        console.log(response);
        this.products = response.items;
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
    this.getProducts();
  }

  public newProduct(){
    this.router.navigate(["new-product"], { relativeTo: this.route });
  }
}
