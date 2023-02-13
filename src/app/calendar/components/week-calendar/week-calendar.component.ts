import { Component, OnInit } from '@angular/core';

export interface WeekDay {
  day: string,
  number: number,
  date: Date
}

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html'
})
export class WeekCalendarComponent implements OnInit {

  today: Date;
  title!:string;
  focusedWeek:WeekDay[] = [];
  
  constructor() {
    this.today = new Date();
    //this.today = new Date(Date.parse('02/14/2023'));//prueba
  }

  ngOnInit(): void {
    this.generateWeek(this.today, 'es');
  }

  generateWeek(date:Date, lang:string){
    this.title = date.toLocaleDateString(lang, {month:'long', year:'numeric'});
    let nextDate = date;
    let weekDay:WeekDay;

    for(let i=0; i<7; i++){
      let index = nextDate.getDay();
      let date = new Date(nextDate)

      //el calendario en español empieza en lunes
      if(lang==='es'){
        //creo un día utilizando la interfaz declarada al inicio de este componente con los valores del siguiente día a añadir
        weekDay = {day: nextDate.toLocaleDateString('es', {weekday:'short'}), number: nextDate.getDate(), date: date};
        //introduzco el día en el array de la semana según su número de la semana y cambio el contenido del siguiente día a añadir
        if(index===0){
          this.focusedWeek.splice(6, 0, {...weekDay});
          nextDate.setDate(nextDate.getDate() - 6)
        }else{
          this.focusedWeek.splice(index -1, 0, {...weekDay});
          nextDate.setDate(nextDate.getDate() + 1);
        }

      //el calendario en ingles empieza en domingo
      }else{
        weekDay = {day: nextDate.toLocaleDateString('eng', {weekday:'short'}), number: nextDate.getDate(), date: date};//enviar una copia no funciona, por qué?
        this.focusedWeek.splice(index, 0, {...weekDay});
        if(index===6){
          nextDate.setDate(nextDate.getDate() - 6)
        }else{
          nextDate.setDate(nextDate.getDate() + 1);
        }
      }
    }
  }

  changeWeek(operator:string){
    //creo la fecha de inicio a partir del primer elemento de la semana mostrada actualmente
    let newWeekDay:Date = new Date(this.focusedWeek[0].date);
    if(operator==='-'){
      newWeekDay.setDate(newWeekDay.getDate()-7);
    }else if(operator==='+'){
      newWeekDay.setDate(newWeekDay.getDate()+7);
    }
    //limpio la semana mostrada y la genero con la nueva fecha
    this.focusedWeek.splice(0, this.focusedWeek.length);
    this.generateWeek(newWeekDay, 'es');
  }
}
