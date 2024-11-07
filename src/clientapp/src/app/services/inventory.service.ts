import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inventory } from 'src/app/models/warehouse.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  constructor(private http: HttpClient) { }

  public addProductToInventory(warehouseIde:number, productId:number, inventory:Inventory){
    const URLRequest = `${environment.inventory}/${productId}/${warehouseIde}`;
    return this.http.post(URLRequest,inventory);

  }
}
