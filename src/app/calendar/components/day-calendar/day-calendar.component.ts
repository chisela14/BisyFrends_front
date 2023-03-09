import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event.interface';
import Swal from 'sweetalert2';
import { EventService } from '../../services/event.service';

export interface DayEvent{
  id:number,
  hour:number,
  name:string
}

@Component({
  selector: 'app-day-calendar',
  templateUrl: './day-calendar.component.html'
})

export class DayCalendarComponent implements OnInit {

  today: Date;
  userEvents!:Event[];
  dayEvents!:DayEvent[];
  constructor(private eventService:EventService) {
    this.today = new Date();
    //this.today = new Date(Date.parse('03/28/2023'));//hay evento
    this.getUserEvents();
  }

  ngOnInit(): void {
    this.generateDay(this.today, 'es');
    
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
      next: (resp:Event[])=>{//filtro la respuesta para guardar los eventos que ocurran hoy
        this.userEvents= resp.filter((event)=>{//finalDate: "28-03-2023 00:00:00"
          let fDate = this.convertfinalDateStrToDate(event.finalDate);
          return fDate.getDate()===this.day.getDate() && fDate.getMonth()===this.day.getMonth() && fDate.getFullYear()===this.day.getFullYear()
        })
        for(let event of this.userEvents){
          let eventDate = event.finalDate.split(" ")[1];
          let [hours, minutes, seconds] = eventDate.split(":");
          let dayEvent = {id: event.id, hour: Number(hours), name: event.name}
          if(this.dayEvents!=undefined){
            this.dayEvents.push(dayEvent);
          }else{
            this.dayEvents=[dayEvent];
          }
        }
        },
      error: () => {Swal.fire("Error al recuperar los eventos del usuario")}
    })
  }

  //función para añadir los eventos del usuario al array
  // formatEvents(){
  //   //recorro los eventos
  //   for(let event of this.userEvents){
  //     let eventDate = event.finalDate.split(" ")[1];
  //     let [hours, minutes, seconds] = eventDate.split(":");
  //     let dayEvent = {id: event.id, hour: Number(hours), name: event.name}
  //     if(this.dayEvents!=undefined){
  //       this.dayEvents.push(dayEvent);
  //     }else{
  //       this.dayEvents=[dayEvent];
  //     }
      
  //   }
  // }

  //ampliación: manejar varios eventos en la misma hora

  cellEvent!:DayEvent|undefined;
  freeHour(index:number):boolean{
    this.cellEvent =  this.dayEvents.find((obj)=> obj.hour==index);
    return (this.cellEvent==undefined) ? false:true
  }
}
