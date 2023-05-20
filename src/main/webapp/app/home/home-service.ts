import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { SlList } from '../../app/entities/sllist/sllist-model'
import { SlGroup } from '../../app/entities/slgroup/slgroup-model'
import { SlStore } from '../../app/entities/slstore/slstore-model'

const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

@Injectable({
    providedIn: 'root'
})
export class HomeService  {
  resourceUrl = environment.apiBaseUrl;
  constructor(protected httpClient: HttpClient) { }

  getGroups(): Observable<HttpResponse<SlGroup[]>> {
    return this.httpClient.get<SlGroup[]>(this.resourceUrl + '/groups', { headers: httpHeaders, observe: 'response' });
  }

  getStores(): Observable<HttpResponse<SlStore[]>> {
    return this.httpClient.get<SlStore[]>(this.resourceUrl + '/stores', { headers: httpHeaders, observe: 'response' });
  }

  getLists(query: string): Observable<HttpResponse<SlList[]>> {
    return this.httpClient.get<SlList[]>(this.resourceUrl + '/lists' + query, { headers: httpHeaders, observe: 'response' });
  }

  deleteList(id: number): Observable<HttpResponse<{}>> {
    return this.httpClient.delete<SlList>(this.resourceUrl + '/lists/' + id, { headers: httpHeaders, observe: 'response' });
  }

  copyList(id: number): Observable<SlList> {
    return this.httpClient.post<SlList>(this.resourceUrl + '/lists/copy?listId=' + id, { headers: httpHeaders, observe: 'response' });
  }


}