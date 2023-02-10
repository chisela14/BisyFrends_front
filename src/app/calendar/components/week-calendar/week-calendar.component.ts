import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-calendar',
  templateUrl: './week-calendar.component.html'
})
export class WeekCalendarComponent implements OnInit {

  today: Date;
  focusedWeek:Date[] = [];
  
  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.calculateWeek();
    this.generateWeek(this.today);
    this.getTitle();
  }
//https://www.geeksforgeeks.org/calculate-current-week-number-in-javascript/
  calculateWeek(){ //arreglar
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let currentMinusStart = new Date();
    currentMinusStart.setDate(currentDate.getDate() - startDate.getDate());
    //Number(currentDate) - Number(startDate)
    let days = Math.floor(Number(currentMinusStart) / (24 * 60 * 60 * 1000));
    
    console.log(currentDate)   
    let weekNumber = Math.ceil(days / 7);
     
    // Display the calculated result      
    console.log("Week number of " + currentDate + " is :   " + weekNumber);
  }

  generateWeek(date:Date){
    let nextDate:Date = date;

    for(let i=0; i<7; i++){
      nextDate.setDate(nextDate.getDate() +1);
      this.focusedWeek.push(nextDate);
      console.log(nextDate)
    }
    console.log(this.focusedWeek)
  }

  title!:string;
  getTitle(){
    this.title = this.today.toLocaleDateString('es', {month:'long', year:'numeric'});
    this.title.charAt(0).toUpperCase();
  }

  weekBefore(){
    console.log('enviado');
  }

  weekAfter(){
    console.log('enviado');
  }

}
