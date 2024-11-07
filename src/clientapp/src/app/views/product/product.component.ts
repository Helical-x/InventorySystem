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
  public editProduct(productId:number){
    this.router.navigate([`edit-product/`,productId], { relativeTo: this.route });
  }

  private getMockProducts(){
    return [
      {
        productId: 1,
        productCode: 'P001',
        barcode: '123456789012',
        productName: 'Producto A',
        productDescription: 'Descripción del Producto A',
        productCategory: 'Categoría 1',
        reorderQuantity: 10,
        productWeight: 1.5,
        productHeight: 10,
        productWidth: 5,
        productDepth: 3
      },
      {
        productId: 2,
        productCode: 'P002',
        barcode: '123456789013',
        productName: 'Producto B',
        productDescription: 'Descripción del Producto B',
        productCategory: 'Categoría 1',
        reorderQuantity: 20,
        productWeight: 2.0,
        productHeight: 15,
        productWidth: 8,
        productDepth: 4
      },
      {
        productId: 3,
        productCode: 'P003',
        barcode: '123456789014',
        productName: 'Producto C',
        productDescription: 'Descripción del Producto C',
        productCategory: 'Categoría 2',
        reorderQuantity: 15,
        productWeight: 1.2,
        productHeight: 12,
        productWidth: 6,
        productDepth: 3.5
      },
      {
        productId: 4,
        productCode: 'P004',
        barcode: '123456789015',
        productName: 'Producto D',
        productDescription: 'Descripción del Producto D',
        productCategory: 'Categoría 2',
        reorderQuantity: 30,
        productWeight: 3.1,
        productHeight: 20,
        productWidth: 10,
        productDepth: 5
      },
      {
        productId: 5,
        productCode: 'P005',
        barcode: '123456789016',
        productName: 'Producto E',
        productDescription: 'Descripción del Producto E',
        productCategory: 'Categoría 3',
        reorderQuantity: 8,
        productWeight: 0.5,
        productHeight: 5,
        productWidth: 3,
        productDepth: 1.5
      },
      {
        productId: 6,
        productCode: 'P006',
        barcode: '123456789017',
        productName: 'Producto F',
        productDescription: 'Descripción del Producto F',
        productCategory: 'Categoría 3',
        reorderQuantity: 25,
        productWeight: 1.8,
        productHeight: 12,
        productWidth: 6,
        productDepth: 3
      },
      {
        productId: 7,
        productCode: 'P007',
        barcode: '123456789018',
        productName: 'Producto G',
        productDescription: 'Descripción del Producto G',
        productCategory: 'Categoría 1',
        reorderQuantity: 12,
        productWeight: 1.1,
        productHeight: 8,
        productWidth: 5,
        productDepth: 2
      },
      {
        productId: 8,
        productCode: 'P008',
        barcode: '123456789019',
        productName: 'Producto H',
        productDescription: 'Descripción del Producto H',
        productCategory: 'Categoría 2',
        reorderQuantity: 18,
        productWeight: 2.5,
        productHeight: 14,
        productWidth: 7,
        productDepth: 4
      },
      {
        productId: 9,
        productCode: 'P009',
        barcode: '123456789020',
        productName: 'Producto I',
        productDescription: 'Descripción del Producto I',
        productCategory: 'Categoría 3',
        reorderQuantity: 7,
        productWeight: 0.9,
        productHeight: 6,
        productWidth: 3,
        productDepth: 1.2
      },
      {
        productId: 10,
        productCode: 'P010',
        barcode: '123456789021',
        productName: 'Producto J',
        productDescription: 'Descripción del Producto J',
        productCategory: 'Categoría 1',
        reorderQuantity: 22,
        productWeight: 2.0,
        productHeight: 10,
        productWidth: 6,
        productDepth: 3
      }
    ];
  }
}
