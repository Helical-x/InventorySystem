import { Injectable } from '@angular/core';
import { Customer } from './../models/customer.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  public getCustomers (pageNumber:number,pageSize: number): Observable<any> {
    const params = {
      'pageNumber': pageNumber,
      'pageSize': pageSize
    }
    return this.http.get(environment.customer, {params});
  }
  public getAllCustormers():Observable<any> {
    return this.http.get(environment.customer);
  }
  public findProduct(customerId:number): Observable<any> {
    const URLRequest = `${environment.customer}/${customerId}`;
    return this.http.get(URLRequest);
  }

  public createCustomer(customer:Customer): Observable<any> {
    return this.http.post(environment.customer,customer);
  }

  public editCustomer(customer:Customer): Observable<any> {
    const URLRequest = `${environment.customer}/${customer.customerId}`;
    return this.http.put(URLRequest,customer);
  }
}
