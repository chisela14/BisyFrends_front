import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event.interface';
import { EventService } from '../../services/event.service';

export interface DateEvent{
  date: Date,
  event: Event | null
}

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html'
})
export class MonthCalendarComponent implements OnInit {

  //hasta que recupere los datos de la api
  testEvent: Event = this.eventService.getEvents()[0];


  today: Date;
  constructor(private eventService:EventService) {
    this.today = new Date();
    //this.today = new Date(Date.parse('01/14/2023'));//prueba
  }

  weekDays: string[] = [];
  //focusedMonth: Date[] = [];
  focusedMonth:Map<Number, DateEvent[]> = new Map<Number, DateEvent[]>();
  monthWeeks: number = 4;
  ngOnInit(): void {
    this.weekDays = this.generateWeek(this.today, 'es');
    this.monthWeeks = this.weekCount(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
    this.generateMonth(this.today);
    this.setEvents();
  }

  //generar mes en un mapa a partir de una fecha
  generateMonth(date:Date){
    //número de semanas en un mes
    let weeks = this.weekCount(date.getFullYear(), date.getMonth(), date.getDay()); 
    //dias totales que se mostrarán
    let totalDays =  weeks* 7; 
    
    //arreglos para que el 0 no estropee las matemáticas (diciembre y domingo tienen comportamientos especiales)
    let dateNumber = new Date(date.getFullYear(), date.getMonth(), 1).getDay();//weekday del primer día del mes
    if(dateNumber===0){dateNumber=7;}
    let prevMonthNumber = date.getMonth() -1;
    let yearNumber = date.getFullYear();
    if(prevMonthNumber===-1){
      yearNumber = yearNumber -1;
      prevMonthNumber = 11;
    }

    //calculo el primer día del calendario, que casi siempre será un día del mes anterior
    let prevMonthStart = new Date(yearNumber, prevMonthNumber+1, 0).getDate()-(dateNumber-2);// -1 por el día que estamos, -1 por el que empieza
    //variable que guarda el siguiente número del mes a poner en el calendario
    let nextMonthDay:number = prevMonthStart;
    //array con el mes que luego se pasará a un mapa
    let monthArray: DateEvent[] = [];
    for(let i=0; i<totalDays; i++){
      let nextDay: Date;
      let dateEvent: DateEvent;
      if(i<dateNumber-1){
        nextDay = new Date(yearNumber, prevMonthNumber, nextMonthDay);
      }else{
        if(i==dateNumber-1){//cuando la i llegue a la posición donde ira el 1
          nextMonthDay = 1;
        }
        nextDay = new Date(date.getFullYear(), date.getMonth(), nextMonthDay);
      }
      nextMonthDay += 1;
      dateEvent = {date: nextDay, event: null}
      monthArray.push(dateEvent)
    }
    //introduzco el array del mes en el mapa
    for(let i=0; i<weeks; i++){
        let lastPart = monthArray.splice(0,7);
        this.focusedMonth.set(i, lastPart);
    }
  }

  //podría buscar una forma más eficaz de conseguir el texto de los días de la semana y el título
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


  changeMonth(operator:string){
    let week: DateEvent[] | undefined = this.focusedMonth.get(1);
    let newMonth = week![0].date; 
    if(operator==='-'){
      newMonth.setMonth(newMonth.getMonth()-1);
    }else{ //operator==='+'
      newMonth.setMonth(newMonth.getMonth()+1);
    }
    this.focusedMonth.clear();
    this.generateWeek(newMonth, 'es');
    this.generateMonth(newMonth);
  }

  //función para añadir los eventos del usuario al array
  setEvents(){
    let week: DateEvent[] | undefined = this.focusedMonth.get(1);
    week![0].event = this.testEvent;
    this.focusedMonth.set(1, week!);
  }

}
