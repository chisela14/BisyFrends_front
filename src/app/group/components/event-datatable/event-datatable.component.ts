import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event.interface';
import { GroupDto } from '../../../interfaces/group.interface';
import { EventService } from '../../../calendar/services/event.service';
import { GroupService } from '../../services/group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-datatable',
  templateUrl: './event-datatable.component.html'
})
export class EventDatatableComponent implements OnInit {

  @Input() group!:GroupDto;
  events: Event[] = []

  constructor(private eventService:EventService, private groupService:GroupService) { }

  ngOnInit(): void {
      this.groupService.getGroup(this.group.id)
      .subscribe({
        next: ({events})=>{this.events = events},
        error: ()=>{Swal.fire("Error al obtener los eventos de grupo")}
      })
  }
  
  searchEvents(input:string){
    let matchedEvents: Event[] = [];
    for(let event of this.events){
      if(event.name.toLowerCase().includes(input)){
        matchedEvents.push(event)
      }
    }
    if(matchedEvents.length){
      this.events = matchedEvents;
    }else{
      Swal.fire("No se encontraron eventos que incluyan en su nombre el término '" + input + "'")
    }
    
  }

}
