import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { MainCalendarComponent } from './main-calendar/main-calendar.component';
import { SmallCalendarComponent } from './small-calendar/small-calendar.component';
import { SettingsComponent } from './settings/settings.component';
import { AddEventComponent } from './add-event/add-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';


@NgModule({
  declarations: [
    MainCalendarComponent,
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
    MainCalendarComponent,
    SmallCalendarComponent,
    SettingsComponent,
    AddEventComponent,
    UpdateEventComponent
  ]
})
export class CalendarModule { }
