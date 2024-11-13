import { environment } from './../../environments/environment';
import { Warehouse } from './../models/warehouse.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { constant } from 'lodash-es';

@Injectable()
export class WarehouseService {

  constructor(private http: HttpClient) { }

  public getWarehouses (pageNumber:number,pageSize: number): Observable<any> {
    const params = {
      'pageNumber': pageNumber,
      'pageSize': pageSize
    }
    return this.http.get(environment.warehouse, {params});
  }

  public getAllWarehouses (): Observable<any> {
    return this.http.get(environment.warehouse);
  }

  public createWarehouse(warehouse:Warehouse): Observable<any> {
    return this.http.post(environment.warehouse,warehouse);
  }

  public getInventoryByWarehouseId(warehouseIde:number):Observable<any> {
    const URLRequest = `${environment.warehouse}/${warehouseIde}/products`;
    return this.http.get(URLRequest);
  }


}
