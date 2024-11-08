import { Injectable } from '@angular/core';
import { Provider } from './../models/provider.models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable()
export class ProviderService {

  constructor(private http: HttpClient) { }

  public getProviders (pageNumber:number,pageSize: number): Observable<any> {
    const params = {
      'pageNumber': pageNumber,
      'pageSize': pageSize
    }
    return this.http.get(environment.provider, {params});
  }
  public getAllCustormers():Observable<any> {
    return this.http.get(environment.products);
  }
  public findProvider(providerId:number): Observable<any> {
    const URLRequest = `${environment.provider}/${providerId}`;
    return this.http.get(URLRequest);
  }

  public createProvider(provider:Provider): Observable<any> {
    return this.http.post(environment.provider,provider);
  }

  public editProvider(provider:Provider): Observable<any> {
    const URLRequest = `${environment.provider}/${provider.providerId}`;
    return this.http.put(URLRequest,provider);
  }
}
