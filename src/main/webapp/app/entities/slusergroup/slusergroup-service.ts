import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlUserGroup } from 'src/main/webapp/app/entities/slusergroup/slusergroup-model'

@Injectable({
    providedIn: 'root'
})
export class SlUserGroupService extends CrudService<SlUserGroup> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/usergroups");
    }
}