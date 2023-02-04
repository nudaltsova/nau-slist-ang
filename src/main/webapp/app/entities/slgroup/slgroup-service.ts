import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlGroup } from 'src/main/webapp/app/entities/slgroup/slgroup-model'

@Injectable({
    providedIn: 'root'
})
export class SlGroupService extends CrudService<SlGroup> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/groups");
    }
}