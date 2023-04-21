import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlStoreDetailsComponent } from 'src/main/webapp/app/entities/slstore/edit/slstore-edit.component'
import { SlStoreListComponent } from 'src/main/webapp/app/entities/slstore/list/slstore-list.component'
import { SlStoreRoutingModule } from 'src/main/webapp/app/entities/slstore/slstore-routing'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule, SlStoreRoutingModule],
  declarations: [SlStoreListComponent, SlStoreDetailsComponent],
  entryComponents: [SlStoreListComponent],
})

export class SlStoreModule {}