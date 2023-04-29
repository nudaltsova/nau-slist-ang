import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SlDepartmentDetailsComponent } from 'src/main/webapp/app/entities/sldepartment/edit/sldepartment-edit.component'
import { SlDepartmentListComponent } from 'src/main/webapp/app/entities/sldepartment/list/sldepartment-list.component'
import { SlDepartmentRoutingModule } from 'src/main/webapp/app/entities/sldepartment/sldepartment-routing'
import { SlItemModule } from 'src/main/webapp/app/entities/slitem/slitem-module'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule, SlDepartmentRoutingModule, SlItemModule],
  exports: [SlDepartmentListComponent],
  declarations: [SlDepartmentListComponent, SlDepartmentDetailsComponent],
  entryComponents: [SlDepartmentListComponent],
})

export class SlDepartmentModule {}