import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HomeService } from './home-service';
import { SlGroup } from '../../app/entities/slgroup/slgroup-model'
import { SlStore } from '../../app/entities/slstore/slstore-model'
import { SlList } from '../../app/entities/sllist/sllist-model'
import { HttpResponse } from "@angular/common/http";
import { AbstractCrudComponent } from '../core/crud/crud.entity.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})

export class HomeComponent extends AbstractCrudComponent implements OnInit {
  groups: SlGroup[] = []
  stores: SlStore[] = []
  groupStores: SlStore[][]
  lists: SlList[] = []
  activeGroupIndex = -1;
  activeStoreIndex = 0;
  someFlag = true;

  constructor(
    protected homeService: HomeService,
    protected routerService: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.isLoading = true;
    this.activeStoreIndex = -1;
    this.activeGroupIndex = 0;
    this.routerService.params.subscribe(
      param => {
        const id = param['id']

        if (id) {
          super.logMessage("id from query", id);
          this.activeGroupIndex = Number(id);
        }
        this.loadGroups();
      }
    );
  }

  private loadGroups(): void {
    // let queryParams = "?page=1";
    // queryParams = queryParams + "&size=10" + environment.itemsPerPage;
    // queryParams = queryParams + "&sort=date,DESC";
    super.logMessage("loadGroups started");
    this.homeService.getGroups().subscribe({
      next: (res: HttpResponse<SlGroup[]>) => {
        this.groups = res.body;
        if (this.groups.length <= this.activeGroupIndex) {
          this.activeGroupIndex = this.groups.length - 1;
        }
        this.loadStores();
      },
      error: (error: any) => {
        super.onError(error);
      },
    });

  }

  getGroups(): SlGroup[] {
    if (this.isLoading)
      return [];

    super.logMessage("getGroups");
    return this.groups;
  }

  hasGroups(): boolean {
    return this.groups && this.groups.length > 0;
  }

  getActiveGroup(): SlGroup {
    return this.groups[this.activeGroupIndex];
  }

  private loadStores(): void {
    super.logMessage("loadStores started, activeGroupIndex=" + this.activeGroupIndex);
    this.stores = []
    this.homeService.getStores().subscribe({
      next: (res: HttpResponse<SlStore[]>) => {
        res.body.forEach(s => {
          if (s.group.id === this.groups[this.activeGroupIndex].id)
            this.stores.push(s);
        })
        this.activeStoreIndex = this.stores.length > 0 ? 0 : -1;
        this.isLoading = false;
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
  }

  getStores(): SlStore[] {
    if (this.isLoading)
      return [];

    super.logMessage("getStores", "active group", this.activeGroupIndex, "stoeres: ", this.stores);
    return this.stores;
  }

  hasStores(): boolean {
    return this.stores && this.stores.length > 0;
  }

  getActiveStore(): SlStore {
    return this.stores[this.activeStoreIndex];
  }

  loadLists(storeId: number) {
    this.activeStoreIndex = storeId;
    super.logMessage("lists", storeId);
  }

  isActive(storeIdx: number) {
    if (this.activeStoreIndex < 0) {
      return false;
    }
    const result = this.activeStoreIndex === storeIdx;
    super.logMessage("isActive storeId ", storeIdx, "activeStoreIndex", this.activeStoreIndex, "result ", result);
    return result;
  }
  changeStore(storeIdx: number){
    this.activeStoreIndex = storeIdx;
  }
}
