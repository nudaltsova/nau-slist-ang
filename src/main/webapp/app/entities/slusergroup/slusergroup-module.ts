import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlUserGroupDetailsComponent } from 'src/main/webapp/app/entities/slusergroup/edit/slusergroup-edit.component'
import { SlUserGroupListComponent } from 'src/main/webapp/app/entities/slusergroup/list/slusergroup-list.component'
import { SlUserGroupRoutingModule } from 'src/main/webapp/app/entities/slusergroup/slusergroup-routing'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule, SlUserGroupRoutingModule],
  declarations: [SlUserGroupListComponent, SlUserGroupDetailsComponent],
  entryComponents: [SlUserGroupListComponent],
})

export class SlUserGroupModule {}