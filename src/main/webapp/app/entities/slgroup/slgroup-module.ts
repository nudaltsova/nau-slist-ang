import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlGroupDetailsComponent } from 'src/main/webapp/app/entities/slgroup/edit/slgroup-edit.component'
import { SlGroupListComponent } from 'src/main/webapp/app/entities/slgroup/list/slgroup-list.component'
import { SlGroupRoutingModule } from 'src/main/webapp/app/entities/slgroup/slgroup-routing'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule, SlGroupRoutingModule],
  declarations: [SlGroupListComponent, SlGroupDetailsComponent],
  entryComponents: [SlGroupListComponent],
})

export class SlGroupModule {}