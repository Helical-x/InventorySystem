import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.models';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductsService],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss'
})
export class NewProductComponent {
  product: Product = {
    productId: 0,
    productCode: null,
    barcode: null,
    productName: null,
    productDescription: null,
    productCategory: null,
    reorderQuantity: 0,
    productWeight: 0,
    productHeight: 0,
    productWidth: 0,
    productDepth: 0
  };
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  onSubmit() {
    this.productsService.createProduct(this.product).subscribe(
      response => {
        console.log('Producto creado:', response);
        this.router.navigate(['/products']); // Navegar a la lista de productos después de la creación
      },
      error => {
        console.error('Error al crear el producto:', error);
      }
    );
  }

}
