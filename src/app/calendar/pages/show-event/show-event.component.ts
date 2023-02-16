import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html'
})
export class ShowEventComponent implements OnInit {

  //recuperar datos del evento a partir del id de la url
  event!:Event;
  constructor(private route: ActivatedRoute) {
    console.log(this.route.snapshot.params['event'])
  }

  ngOnInit(): void {
  }
  
  testEvent: Event = {
    id: 1,
    name: 'Cena',
    info: 'En el bar Manolo',
    duration: 2,
    attendance: 100,
    date: new Date('2023-02-17'),
    group: {
      name: 'daw', 
      description: 'desarrollo de aplicaciones web', 
      participants: [{username: 'ioliasa', picture: ''}]
    }
  };

}
