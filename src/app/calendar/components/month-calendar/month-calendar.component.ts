import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html'
})
export class MonthCalendarComponent implements OnInit {

  today: Date;
  constructor() {
    this.today = new Date();
    //this.today = new Date(Date.parse('01/14/2023'));//prueba
  }

  weekDays: string[] = [];
  //focusedMonth: Date[] = [];
  focusedMonth:Map<Number, Date[]> = new Map<Number, Date[]>();
  monthWeeks: number = 4;
  ngOnInit(): void {
    this.weekDays = this.generateWeek(this.today, 'es');
    this.monthWeeks = this.weekCount(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
    this.generateMonth(this.today);
  }

  //generar mes en un mapa
  generateMonth(date:Date){
    let dateNumber = date.getDay();
    let weeks = this.weekCount(date.getFullYear(), date.getMonth(), date.getDay());
    let totalDays =  weeks* 7;
    console.log(totalDays);
    let prevMonthStart = new Date(date.getFullYear(), date.getMonth() -1, 0).getDate()-(dateNumber -2);//-1 por el indice(0 es domingo), -1 por el día que estamos
    //console.log(prevMonthStart);
    let monthDays = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
    //console.log(monthDays)
    let nextMonthDay:number = 1;
    let monthArray: Date[] = [];
    for(let i=0; i<totalDays; i++){
      let nextDay: Date;
      if(i<dateNumber ){
        nextDay = new Date(date.getFullYear(), date.getMonth() -1, prevMonthStart);
        prevMonthStart += 1;
      }else if(i>monthDays+dateNumber-1){
        nextDay = new Date(date.getFullYear(), date.getMonth() +1, nextMonthDay);
        nextMonthDay += 1;
      }else{//i >= dateNumber
        nextDay = new Date(date.getFullYear(), date.getMonth(), i-(dateNumber-1));
        prevMonthStart += 1;
      }
      monthArray.push(nextDay)
    }

    let monthWeeksIndex = Math.ceil(monthArray.length / weeks);
    for(let i=0; i<weeks; i++){
        let lastPart = monthArray.splice(-monthWeeksIndex);
        this.focusedMonth.set(i, lastPart);
    }
    console.log(this.focusedMonth)
  }

  //genera un mes mas los días del anterior y el siguiente que sean necesarios para completar una tabla de 7* número de semanas
  // generateMonth(date:Date){
  //   let dateNumber = date.getDay();
  //   let totalDays = this.weekCount(date.getFullYear(), date.getMonth(), date.getDay()) * 7;
  //   console.log(totalDays);
  //   let prevMonthStart = new Date(date.getFullYear(), date.getMonth() -1, 0).getDate()-(dateNumber -2);//-1 por el indice(0 es domingo), -1 por el día que estamos
  //   //console.log(prevMonthStart);
  //   let monthDays = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();
  //   //console.log(monthDays)
  //   let nextMonthDay:number = 1;
  //   for(let i=0; i<totalDays; i++){
  //     let nextDay: Date;
  //     if(i<dateNumber ){
  //       nextDay = new Date(date.getFullYear(), date.getMonth() -1, prevMonthStart);
  //       prevMonthStart += 1;
  //     }else if(i>monthDays+dateNumber-1){
  //       nextDay = new Date(date.getFullYear(), date.getMonth() +1, nextMonthDay);
  //       nextMonthDay += 1;
  //     }else{//i >= dateNumber
  //       nextDay = new Date(date.getFullYear(), date.getMonth(), i-(dateNumber-1));
  //       prevMonthStart += 1;
  //     }
  //     this.focusedMonth.push(nextDay)
  //   }
  //   console.log(this.focusedMonth)
  // }
  
  title!:string;
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


  // changeMonth(operator:string){
  //   let week = this.focusedMonth.get(2);
  //   //creo la fecha de inicio a partir del primer elemento de la semana mostrada actualmente
  //   let newMonth:Date = new Date(week[0]); 
  //   if(operator==='-'){
  //     newMonth.setMonth(newMonth.getMonth());
  //   }else{ //operator==='+'
  //     newMonth.setMonth(newMonth.getMonth()+1);
  //     //newMonth = new Date(this.focusedMonth[10].getMonth() +1);
  //   }
  //   console.log(newMonth)
  //   this.generateMonth(newMonth);
  // }

}
