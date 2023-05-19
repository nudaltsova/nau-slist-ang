
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { CrudListComponent } from 'src/main/webapp/app/core/crud/crud-list.component'

import { SlList } from 'src/main/webapp/app/entities/sllist/sllist-model'
import { SlListService } from 'src/main/webapp/app/entities/sllist/sllist-service'

@Component({
  selector: 'list-list',
  templateUrl: './sllist-list.component.html'
})
export class SlListListComponent extends CrudListComponent<SlList> {
  protected activeStore = -1;

  constructor(
       protected override entityService: SlListService,
       protected override modalService: NgbModal,
       protected override routerService: ActivatedRoute) {
    super(entityService, modalService, routerService);
  }


  override ngOnInit(): void {
    this.activeStore = Number(this.routerService.snapshot.url[0] + '');
    super.ngOnInit();
  }

  protected override bulldQuery(page: number): string {
    let queryParams = super.bulldQuery(page);
    queryParams = queryParams + "&store.equal=" + this.activeStore;
    return queryParams;
  }

  addItem(){

  }

  searchChanged(){
    
  }
}