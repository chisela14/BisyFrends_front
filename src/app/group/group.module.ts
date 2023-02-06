import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupInfoComponent } from './group-info/group-info.component';
import { GroupListComponent } from './group-list/group-list.component';
import { EventDatatableComponent } from './event-datatable/event-datatable.component';
import { SearchComponent } from './search/search.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { UpdateGroupComponent } from './update-group/update-group.component';


@NgModule({
  declarations: [
    GroupInfoComponent,
    GroupListComponent,
    EventDatatableComponent,
    SearchComponent,
    AddGroupComponent,
    UpdateGroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ],
  exports: [
    GroupInfoComponent,
    GroupListComponent,
    EventDatatableComponent,
    SearchComponent,
    AddGroupComponent,
    UpdateGroupComponent
  ]
})
export class GroupModule { }
