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
        this.changeStore(this.activeStoreIndex);
      },
      error: (error: any) => {
        super.onError(error);
      },
    });
  }

  getActiveStore(): SlStore {
    return this.stores[this.activeStoreIndex];
  }

  changeStore(storeId: number) {
    this.activeStoreIndex = storeId;

    let queryParams = "?page=" + 0;
    queryParams = queryParams + "&store.equal=" + this.getActiveStore().id;
    queryParams = queryParams + "&size=" + environment.itemsPerPage;
    queryParams = queryParams + "&sort=date"
    queryParams = queryParams + ",DESC";
    this.lists = []
    this.homeService.getLists(queryParams).subscribe({
      next: (res: HttpResponse<SlGroup[]>) => {
        this.lists = res.body;
        this.onSuccess("lists loaded", this.groups);
      },
      error: (error: any) => {
        super.onError(error);
      },
    });

  }

  isActive(storeIdx: number) {
    if (this.activeStoreIndex < 0) {
      return false;
    }
    const result = this.activeStoreIndex === storeIdx;
    super.logMessage("isActive storeId ", storeIdx, "activeStoreIndex", this.activeStoreIndex, "result ", result);
    return result;
  }
}
