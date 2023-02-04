import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlListDetailsComponent } from 'src/main/webapp/app/entities/sllist/edit/sllist-edit.component'
import { SlListListComponent } from 'src/main/webapp/app/entities/sllist/list/sllist-list.component'
import { SlListRoutingModule } from 'src/main/webapp/app/entities/sllist/sllist-routing'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule, SlListRoutingModule],
  declarations: [SlListListComponent, SlListDetailsComponent],
  entryComponents: [SlListListComponent],
})

export class SlListModule {}