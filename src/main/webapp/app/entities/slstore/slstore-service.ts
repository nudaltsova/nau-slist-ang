import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';
import { Observable } from 'rxjs';

import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'

@Injectable({
    providedIn: 'root'
})
export class SlStoreService extends CrudService<SlStore> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/stores");
    }
    
  getSystemStores(): Observable<HttpResponse<SlStore[]>> {
    return this.httpClient.get<SlStore[]>(this.resourceUrl + '/system', { headers: super.getHeaders(), observe: 'response' });
  }
    
  copyStore(query: string): Observable<HttpResponse<SlStore>> {
    console.log("copyStore, query", query);
    return this.httpClient.post<SlStore>(this.resourceUrl + '/copy?' + query, null, { headers: super.getHeaders(), observe: 'response' });
  }

}