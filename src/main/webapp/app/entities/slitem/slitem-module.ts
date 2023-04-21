import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlItemDetailsComponent } from 'src/main/webapp/app/entities/slitem/edit/slitem-edit.component'
import { SlItemListComponent } from 'src/main/webapp/app/entities/slitem/list/slitem-list.component'
import { SlItemRoutingModule } from 'src/main/webapp/app/entities/slitem/slitem-routing'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule, SlItemRoutingModule],
  declarations: [SlItemListComponent, SlItemDetailsComponent],
  entryComponents: [SlItemListComponent],
})

export class SlItemModule {}