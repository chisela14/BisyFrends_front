import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { EventDatatableComponent } from './components/event-datatable/event-datatable.component';
import { SearchComponent } from './components/search/search.component';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { UpdateGroupComponent } from './pages/update-group/update-group.component';
import { ShowGroupsComponent } from './pages/show-groups/show-groups.component';

@NgModule({
  declarations: [
    GroupInfoComponent,
    GroupListComponent,
    EventDatatableComponent,
    SearchComponent,
    AddGroupComponent,
    UpdateGroupComponent,
    ShowGroupsComponent
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
    UpdateGroupComponent,
    ShowGroupsComponent
  ]
})
export class GroupModule { }
