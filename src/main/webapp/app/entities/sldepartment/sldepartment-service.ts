import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'

@Injectable({
    providedIn: 'root'
})
export class SlDepartmentService extends CrudService<SlDepartment> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/departments");
    }
}