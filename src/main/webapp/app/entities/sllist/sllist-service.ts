import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlList } from 'src/main/webapp/app/entities/sllist/sllist-model'

@Injectable({
    providedIn: 'root'
})
export class SlListService extends CrudService<SlList> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/lists");
    }
}