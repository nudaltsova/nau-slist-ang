import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SlItemService extends CrudService<SlItem> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/items");
    }


    
    itemUp(itemId : number): Observable<HttpResponse<SlItem>> {
      console.log("departmentUp, itemId", itemId);
      const url = this.resourceUrl + '/' + itemId + "/up";
      return this.httpClient.put<SlItem>(url, {}, { headers: this.getHeaders(), observe: 'response' });
    }
  
      
    itemDown(itemId : number): Observable<HttpResponse<SlItem>> {
      console.log("departmentUp, itemId", itemId);
      return this.httpClient.put<SlItem>(this.resourceUrl + '/' + itemId + "/down", {}, { headers: this.getHeaders(), observe: 'response' });
    }
  
  
}