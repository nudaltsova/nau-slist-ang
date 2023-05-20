import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { HomeService } from './home-service';
import { SlGroup } from '../../app/entities/slgroup/slgroup-model'
import { SlStore } from '../../app/entities/slstore/slstore-model'
import { SlList } from '../../app/entities/sllist/sllist-model'
import { HttpResponse } from "@angular/common/http";
import { AbstractCrudComponent } from '../core/crud/crud.entity.model';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { NavigationService } from '../core/navigation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialog } from '../core/modal/modal-dialog.component';
import { formatDate } from '@angular/common';

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
    protected routerService: ActivatedRoute,
    protected navigationHistory: NavigationService,
    protected modalService: NgbModal,
    protected authService: MsalService) { super(); }

  ngOnInit(): void {
    this.isLoading = true;
    this.activeStoreIndex = -1;
    this.activeGroupIndex = 0;
    if (this.isAdmin()) {
      this.isLoading = false;
      return;
    }

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

  isAdmin(): boolean {
    var user = null;
    var roles: string[];
    if (this.authService.instance.getAllAccounts().length > 0) {
      user = this.authService.instance.getAllAccounts()[0];
      roles = (this.authService.instance.getAllAccounts()[0].idTokenClaims as any).roles;
    }
    const result = roles && roles.length > 0 && roles.indexOf('SLIST_ROLE_ADMIN') > -1;
    return result;
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
    if (!this.groups || this.groups.length == 0)
      return null;
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
    if (this.activeStoreIndex == -1)
      return null;
    return this.stores[this.activeStoreIndex];
  }

  changeStore(storeId: number) {
    if (storeId == -1)
      return;

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


  deletList(index: number) {
    var entityToDelete = this.lists[index];
    if (entityToDelete == null)
      return;

    const modalRef = this.modalService.open(ModalDialog);
    modalRef.componentInstance.message = "Delete list " + formatDate(entityToDelete.date, 'yyyy-MM-dd hh:mm', 'en_US') + "?";
    modalRef.result.then((result) => {
      if (result) {
        this.homeService.deleteList(entityToDelete.id).subscribe({
          next: (res: HttpResponse<{}>) => {
            this.changeStore(this.activeStoreIndex);
          },
          error: (error: any) => {
            super.onError(error);
            this.lastError = super.lastErrorMsg;
          },
        });
      }
    });
  }

  copyList(index: number) {
    var entityToCopy = this.lists[index];
    if (entityToCopy == null)
      return;

    this.homeService.copyList(entityToCopy.id).subscribe({
      next: (res: SlList) => {
        this.changeStore(this.activeStoreIndex);
      },
      error: (error: any) => {
        super.onError(error);
        this.lastError = super.lastErrorMsg;
      },
    });

  }

}
