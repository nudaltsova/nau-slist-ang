import { HttpResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { EMPTY, mergeMap, Observable, of } from 'rxjs';
import { AbstractEntityWithId } from './crud.entity.model';

import { CrudService } from './crud.service';

export abstract class CrudResolveService<E extends AbstractEntityWithId> implements Resolve<E> {

  constructor(protected service: CrudService<E>) {}

  protected abstract createNew(): E;

  resolve(route: ActivatedRouteSnapshot): Observable<E> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.get(id).pipe(
        mergeMap((result: HttpResponse<E>) => {
          if (result.body) {
            return of(result.body);
          } else {
            return EMPTY;
          }
        })
      );
    }
    return of(this.createNew());
  }
}
