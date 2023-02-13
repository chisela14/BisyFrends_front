import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html'
})
export class MonthCalendarComponent implements OnInit {

  today: Date;
  title!:string;
  weekDays: string[];
  focusedMonth!: Date[];
  monthWeeks: number;

  constructor() {
    this.today = new Date();
    this.weekDays = this.generateWeek(this.today, 'es');
    this.monthWeeks = this.weekCount(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
  }

  ngOnInit(): void {
    this.generateMonth(this.today);
  }

  generateMonth(date:Date){
    let monthDays = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
    for(let i=1; i=monthDays; i++){
      let nextDay = new Date(date.getFullYear(), date.getMonth(), i);
      this.focusedMonth.push({...nextDay})
    }
  }

  generateWeek(date:Date, lang:string):string[]{
    this.title = date.toLocaleDateString(lang, {month:'long', year:'numeric'});
    let nextDate = date;
    let weekDay:string;
    let days: string[] = [];

    for(let i=0; i<7; i++){
      let index = nextDate.getDay();
      weekDay = nextDate.toLocaleDateString(lang, {weekday:'narrow'});
      if(lang==='es'){
        //introduzco el día en el array de la semana según su número de la semana y cambio el contenido del siguiente día a añadir
        if(index===0){
          days.splice(6, 0, weekDay);
          nextDate.setDate(nextDate.getDate() - 6)
        }else{
          days.splice(index -1, 0, weekDay);
          nextDate.setDate(nextDate.getDate() + 1);
        }
      }else{
        days.splice(index, 0, weekDay);
        if(index===6){
          nextDate.setDate(nextDate.getDate() - 6)
        }else{
          nextDate.setDate(nextDate.getDate() + 1);
        }
      }
    }
    return days;
  }

  weekCount(year:number, month:number, startDayOfWeek:number):number {
    let firstOfMonth = new Date(year, month-1, 1);
    let lastOfMonth = new Date(year, month, 0);
    let numberOfDaysInMonth = lastOfMonth.getDate();
    let firstWeekDay = (firstOfMonth.getDay() - startDayOfWeek + 7) % 7;
    let used = firstWeekDay + numberOfDaysInMonth;
    return Math.ceil( used / 7);
  }


  changeMonth(operator:string){
    //creo la fecha de inicio a partir del primer elemento de la semana mostrada actualmente
    let newMonth:Date = new Date(this.focusedMonth[0].getMonth());
    if(operator==='-'){
      newMonth.setDate(newMonth.getMonth()-1);
    }else if(operator==='+'){
      newMonth.setDate(newMonth.getMonth()+1);
    }
  }

}
