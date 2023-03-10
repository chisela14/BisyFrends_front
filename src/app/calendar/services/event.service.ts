import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event} from 'src/app/interfaces/event.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  //conseguir un evento
  getEvent(id:number){
    return this.http.get<Event>(`${environment.apiUrl}/event/${id}`);
  }

  //conseguir eventos del usuario registrado
  getUserEvents():Observable<Event[]>{
    return this.http.get<Event[]>(`${environment.apiUrl}/user/events`);
  }

  //añadir evento
  addEvent(event:Event, groupId:number){
    return this.http.post(`${environment.apiUrl}/event?group=${groupId}`, {event});
  }

  //actualizar evento
  updateEvent(event:Event){
    return this.http.patch(`${environment.apiUrl}/event/${event.id}`, {event});
  }
 
}
