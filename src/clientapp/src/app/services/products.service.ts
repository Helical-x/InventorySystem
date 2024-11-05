import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from 'src/app/models/product.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProducts (pageNumber:number,pageSize: number): Observable<any> {
    const params = {
      'pageNumber': pageNumber,
      'pageSize': pageSize
    }
    return this.http.get(environment.products, {params});
  }

  public createProduct(product:Product): Observable<any> {
    const URLRequest = `${environment.products}/new/`;
    return this.http.post(environment.products,product);
  }
}
