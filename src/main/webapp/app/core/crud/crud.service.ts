import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AbstractEntityWithId } from './crud.entity.model';
const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

export abstract class CrudService<E extends AbstractEntityWithId> {

  constructor(protected httpClient: HttpClient, protected resourceUrl: string) { }

  get(id: number): Observable<HttpResponse<E>> {
    console.log("get, id", id);
    return this.httpClient.get<E>(this.resourceUrl + '/' + id, { headers: httpHeaders, observe: 'response' });
  }

  create(entity: E): Observable<HttpResponse<E>> {
    if (entity.id != null)
      return this.update(entity);
    console.log("create, entity", entity);
    return this.httpClient.post<E>(this.resourceUrl + '/', JSON.stringify(entity), { headers: httpHeaders, observe: 'response' });
  }

  update(entity: E): Observable<HttpResponse<E>> {
    if (entity.id == null)
      return this.create(entity);
    console.log("update, entity", entity);
    return this.httpClient.put<E>(this.resourceUrl + '/' + entity.id, JSON.stringify(entity), { headers: httpHeaders, observe: 'response' });
  }

  delete(entity: E): Observable<HttpResponse<{}>> {
    console.log("delete, entity", entity);
    return this.httpClient.delete(this.resourceUrl + '/' + entity.id, { headers: httpHeaders, observe: 'response' });
  }

  getAll(query: string): Observable<HttpResponse<E[]>> {
    console.log("getAll, entity", query);
    return this.httpClient.get<E[]>(this.resourceUrl + '/' + query, { headers: httpHeaders, observe: 'response' });
  }

}
