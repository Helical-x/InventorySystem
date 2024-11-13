import { Injectable } from '@angular/core';
import { Order } from './../models/provider.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }


  public getOrders(pageNumber: number, pageSize: number): Observable<any> {
    const params = {
      'pageNumber': pageNumber.toString(),
      'pageSize': pageSize.toString()
    };
    return this.http.get(environment.order, { params });
  }

  public getAllOrders(): Observable<any> {
    return this.http.get(environment.order);
  }


  public findOrder(orderId: number): Observable<any> {
    const URLRequest = `${environment.order}/${orderId}`;
    return this.http.get(URLRequest);
  }


  public createOrder(order: Order): Observable<any> {
    return this.http.post(environment.order, order);
  }

  public editOrder(order: Order): Observable<any> {
    const URLRequest = `${environment.order}/${order.orderId}`;
    return this.http.put(URLRequest, order);
  }
}
