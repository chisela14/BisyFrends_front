import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { ShowCalendarComponent } from './pages/show-calendar/show-calendar.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path:'',
        component: ShowCalendarComponent
      },
      {
        path:'addEvent',
        component: AddEventComponent
      },
      {
        path:'updateEvent/:id',
        component: UpdateEventComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
