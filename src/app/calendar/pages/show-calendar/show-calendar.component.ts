import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-calendar',
  templateUrl: './show-calendar.component.html'
})
export class ShowCalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  view:string = "week";
  setView(view:string){
    this.view = view;
  }
}
