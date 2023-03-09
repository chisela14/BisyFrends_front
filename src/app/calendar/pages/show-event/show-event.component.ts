import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/interfaces/event.interface';
import Swal from 'sweetalert2';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html'
})
export class ShowEventComponent implements OnInit {

  //recuperar datos del evento a partir del id de la url
  event!:Event;
  constructor(private route: ActivatedRoute, private eventService:EventService) {
    this.eventService.getEvent(this.route.snapshot.params['event'])
    .subscribe({
      next:(resp)=>{this.event=resp},
      error:(()=>{Swal.fire("No se ha podido recuperar la información del evento")})
    })
  }

  ngOnInit(): void {
  }

}
