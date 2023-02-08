import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { ShowCalendarComponent } from './pages/show-calendar/show-calendar.component';
import { SmallCalendarComponent } from './components/small-calendar/small-calendar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';


@NgModule({
  declarations: [
    ShowCalendarComponent,
    SmallCalendarComponent,
    SettingsComponent,
    AddEventComponent,
    UpdateEventComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule
  ],
  exports: [
    ShowCalendarComponent,
    SmallCalendarComponent,
    SettingsComponent,
    AddEventComponent,
    UpdateEventComponent
  ]
})
export class CalendarModule { }
