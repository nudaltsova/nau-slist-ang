import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from 'src/main/webapp/environments/environment';
import { CrudService } from 'src/main/webapp/app/core/crud/crud.service';

import { SlDepartment } from 'src/main/webapp/app/entities/sldepartment/sldepartment-model'
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class SlDepartmentService extends CrudService<SlDepartment> {
    constructor(httpClient: HttpClient) {
      super(httpClient, environment.apiBaseUrl + "/departments");
    }

    
  departmentUp(departmentId : number): Observable<HttpResponse<SlDepartment>> {
    console.log("departmentUp, departmentId", departmentId);
    const url = this.resourceUrl + '/' + departmentId + "/up";
    return this.httpClient.put<SlDepartment>(url, {}, { headers: this.getHeaders(), observe: 'response' });
  }

    
  departmentDown(departmentId : number): Observable<HttpResponse<SlDepartment>> {
    console.log("departmentUp, departmentId", departmentId);
    return this.httpClient.put<SlDepartment>(this.resourceUrl + '/' + departmentId + "/down", {}, { headers: this.getHeaders(), observe: 'response' });
  }

}