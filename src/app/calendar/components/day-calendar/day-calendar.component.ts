import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html'
})
export class DayCalendarComponent implements OnInit {

  today: Date;
  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.generateDay(this.today, 'es')
  }

  day!:Date;
  title!:string;
  generateDay(date:Date, lang:string){
    this.day = date;
    this.title = date.toLocaleDateString(lang, {weekday:'long', month:'long', year:'numeric', day:'2-digit'});
  }

  changeDay(operator:string){
    let newDay:Date = new Date(this.day);
    if(operator==='-'){
      newDay.setDate(newDay.getDate()-1);
    }else if(operator==='+'){
      newDay.setDate(newDay.getDate()+1);
    }
    this.generateDay(newDay, 'es');
  } 

}
