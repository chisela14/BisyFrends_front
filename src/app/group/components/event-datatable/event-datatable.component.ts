import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event.interface';
import { Group } from '../../../interfaces/group.interface';
import { EventService } from '../../../calendar/services/event.service';

@Component({
  selector: 'app-event-datatable',
  templateUrl: './event-datatable.component.html'
})
export class EventDatatableComponent implements OnInit {

  @Input() group!:Group;
  events: Event[] = []

  constructor(private eventService:EventService) { }

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
  }

  searchEvents(input:string){
    this.events = this.eventService.searchEvents(input);
  }

}
