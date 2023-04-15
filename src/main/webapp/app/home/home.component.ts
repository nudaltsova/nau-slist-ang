import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HomeService } from './home-service';
import { SlGroup } from '../../app/entities/slgroup/slgroup-model'
import { SlStore } from '../../app/entities/slstore/slstore-model'
import { SlList } from '../../app/entities/sllist/sllist-model'
import {HttpResponse } from "@angular/common/http";
import { AbstractCrudComponent } from '../core/crud/crud.entity.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AbstractCrudComponent implements OnInit {
  groups : SlGroup[] = []
  stores : SlStore[] = []
  lists : SlList[] = []

  constructor(protected homeService: HomeService) { super(); }

  ngOnInit(): void {
    let queryParams = "?page=1";
    queryParams = queryParams + "&size=10" + environment.itemsPerPage;
    queryParams = queryParams + "&sort=date,DESC";

    this.homeService.getGroups().subscribe({
      next: (res: HttpResponse<SlGroup[]>) => {
        this.groups = res.body;
      },
      error: (error: any) => {
        super.onError(error);
        this.lastError = super.lastErrorMsg;
      },
    });
    this.homeService.getStores().subscribe({
      next: (res: HttpResponse<SlGroup[]>) => {
        this.stores = res.body;
      },
      error: (error: any) => {
        super.onError(error);
        this.lastError = super.lastErrorMsg;
      },
    });
    this.homeService.getLists().subscribe({
      next: (res: HttpResponse<SlGroup[]>) => {
        this.lists = res.body;
      },
      error: (error: any) => {
        super.onError(error);
        this.lastError = super.lastErrorMsg;
      },
    });
  }

}
