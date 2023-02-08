import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { ShowGroupsComponent } from './pages/show-groups/show-groups.component';
import { UpdateGroupComponent } from './pages/update-group/update-group.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ShowGroupsComponent
      },
      {
        path: 'addGroup',
        component: AddGroupComponent
      },
      {
        path: 'updateGroup',
        component: UpdateGroupComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
