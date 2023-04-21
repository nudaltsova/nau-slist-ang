import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlUserDetailsComponent } from 'src/main/webapp/app/entities/sluser/edit/sluser-edit.component'
import { SlUserListComponent } from 'src/main/webapp/app/entities/sluser/list/sluser-list.component'
import { SlUserRoutingModule } from 'src/main/webapp/app/entities/sluser/sluser-routing'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule, SlUserRoutingModule],
  declarations: [SlUserListComponent, SlUserDetailsComponent],
  entryComponents: [SlUserListComponent],
})

export class SlUserModule {}