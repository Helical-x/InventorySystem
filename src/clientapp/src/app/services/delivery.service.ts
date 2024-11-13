import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery } from '../models/customer.models';
import { environment } from '../../environments/environment';


@Injectable()
export class DeliveryService {

  private apiUrl = `${environment.delivery}`;

  constructor(private http: HttpClient) {}

  createDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.apiUrl, delivery);
  }
}
