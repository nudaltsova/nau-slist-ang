import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlList } from 'src/main/webapp/app/entities/sllist/sllist-model'
import { SlItem } from '../slitem/slitem-model';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class SlListService extends CrudService<SlList> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/lists");
    }

    getStoreItems(query: string): Observable<HttpResponse<SlItem[]>> {
      console.log("getAll, entity", query);
      return this.httpClient.get<SlItem[]>(environment.apiBaseUrl + '/items/store?' + query, { headers: super.getHeaders(), observe: 'response' });
    }
  
}