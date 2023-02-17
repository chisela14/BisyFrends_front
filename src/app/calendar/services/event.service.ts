import { Injectable } from '@angular/core';
import { Event } from 'src/app/interfaces/event.interface';
import { GroupService } from '../../group/services/group.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //hasta que recupere los eventos de la api
  groups = this.groupService.getGroups();

  events:Event[] = [
    {
      id: 1,
      name: 'Cena',
      info: 'En el bar Manolo',
      duration: 2,
      attendance: 100,
      date: new Date('2023-02-17'),
      group: this.groups[0]
    }
  ]

  constructor(private groupService: GroupService) { }

  getEvents():Event[]{
    return this.events;
  }
}
