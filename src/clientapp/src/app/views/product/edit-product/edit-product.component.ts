import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.models';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductsService],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{

  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.loadProduct(Number(productId));
    }
  }
  loadProduct(productId: number): void {
    this.productsService.findProduct(productId).subscribe(
      product => this.product = product,
      error => console.error('Error al cargar el producto:', error)
    );
  }


  onSubmit() {
    if(this.product == undefined) {
      return;
    }
    this.productsService.editProduct(this.product).subscribe(
      response => {
        console.log('Producto creado:', response);
        this.router.navigate(['/products']);
      },
      error => {
        console.error('Error al crear el producto:', error);
      }
    );
  }

}
