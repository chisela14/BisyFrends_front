import { Component, OnInit } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Event } from 'src/app/interfaces/event.interface';
import Swal from 'sweetalert2';
import { EventService } from '../../services/event.service';

export interface DateEvent{
  date: Date,
  event: Event[] | undefined
}

@Component({
  selector: 'app-month-calendar',
  templateUrl: './month-calendar.component.html'
})
export class MonthCalendarComponent implements OnInit {

  today: Date;
  constructor(private eventService:EventService) {
    this.today = new Date();
    //this.today = new Date(Date.parse('01/14/2023'));//prueba
  }

  weekDays: string[] = [];
  //focusedMonth: Date[] = [];
  focusedMonth:Map<Number, DateEvent[]> = new Map<Number, DateEvent[]>();
  monthWeeks: number = 4;
  userEvents!:Event[];

  ngOnInit(): void {
    this.weekDays = this.generateWeek(this.today, 'es');
    this.monthWeeks = this.weekCount(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
    this.generateMonth(this.today);
    this.getUserEvents();
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
      dateEvent = {date: nextDay, event: undefined}
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
    this.getUserEvents();
  }

  convertfinalDateStrToDate(str:string):Date{
    let eventDate = str.split(" ")[0];
    let [day, month, year] = eventDate.split("-");
    let fDate = new Date(Number(year), Number(month)-1, Number(day));
    return fDate;
  }
  
  //conseguir eventos del usuario haciendo uso del servicio
  getUserEvents(){
    this.eventService.getUserEvents()
    .subscribe({
      next: (resp:Event[])=>{//filtro la respuesta para guardar los eventos que ocurran este mes
        this.userEvents= resp.filter((event)=>{//finalDate: "28-03-2023 00:00:00"
          let fDate = this.convertfinalDateStrToDate(event.finalDate);
          let currentWeekReference = this.focusedMonth.get(1);
          return fDate.getMonth()===currentWeekReference![0].date.getMonth() && fDate.getFullYear()===currentWeekReference![0].date.getFullYear()
        })
        this.setEvents()},
      error: () => {Swal.fire("Error al recuperar los eventos del usuario")}
    })
  }

  //función para añadir los eventos del usuario al array
  setEvents(){
    //recorro los eventos
    for(let event of this.userEvents){
      //si el dia final del evento coincide con alguno de los dias del focused month le añado el evento (de momento los eventos sin día final se verán en los grupos)
      let fDate = this.convertfinalDateStrToDate(event.finalDate);
      for(let week of this.focusedMonth.values()){
        //encontrar en el array un objeto de DateEvent cuyo Date sea igual al dia final (cuidado con los formatos)
        let day = week.find(({date})=> date.getTime()===fDate.getTime());
        if(day!=undefined){
          let dayIndex = week.findIndex((obj => obj === day));
          if(week[dayIndex].event !=undefined){
            week[dayIndex].event!.push(event);
          }else{
            week[dayIndex].event! = [event];
          }
          
        }
      }
    }
  }

}
