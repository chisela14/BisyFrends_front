import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { ShowCalendarComponent } from './pages/show-calendar/show-calendar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { DayCalendarComponent } from './components/day-calendar/day-calendar.component';
import { WeekCalendarComponent } from './components/week-calendar/week-calendar.component';
import { MonthCalendarComponent } from './components/month-calendar/month-calendar.component';
import { ShowEventComponent } from './pages/show-event/show-event.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ShowCalendarComponent,
    SettingsComponent,
    AddEventComponent,
    UpdateEventComponent,
    DayCalendarComponent,
    WeekCalendarComponent,
    MonthCalendarComponent,
    ShowEventComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ShowCalendarComponent,
    SettingsComponent,
    AddEventComponent,
    UpdateEventComponent,
    DayCalendarComponent,
    WeekCalendarComponent,
    MonthCalendarComponent,
    ShowEventComponent
  ]
})
export class CalendarModule { }
