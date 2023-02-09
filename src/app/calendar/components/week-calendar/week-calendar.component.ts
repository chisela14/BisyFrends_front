import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html'
})
export class WeekCalendarComponent implements OnInit {

  weekDaysEsp: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
  weekDaysEng: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  today: Date;
  focusedDate!:Date;
  
  constructor() {
    this.today = new Date(Date.now());
  }

  ngOnInit(): void {
    this.focusedDate = this.today;
    this.getTitle();
  }

  title!:string;
  getTitle(){
    this.title = this.focusedDate.toLocaleDateString('es', {month:'long', year:'numeric'});
    this.title.charAt(0).toUpperCase();
  }

}
