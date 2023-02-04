import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlStore } from 'src/main/webapp/app/entities/slstore/slstore-model'

@Injectable({
    providedIn: 'root'
})
export class SlStoreService extends CrudService<SlStore> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/stores");
    }
}