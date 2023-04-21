import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlItem } from 'src/main/webapp/app/entities/slitem/slitem-model'

@Injectable({
    providedIn: 'root'
})
export class SlItemService extends CrudService<SlItem> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/items");
    }
}