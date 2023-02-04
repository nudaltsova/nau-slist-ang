import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlUser } from 'src/main/webapp/app/entities/sluser/sluser-model'

@Injectable({
    providedIn: 'root'
})
export class SlUserService extends CrudService<SlUser> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/users");
    }
}