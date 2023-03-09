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

  //get /event/{event_id}
  getEvent(id:number){
    return this.http.get<Event>(`${environment.apiUrl}/event/${id}`);
  }

  //post /event
  //patch /event/{event_id}

  getUserEvents():Observable<Event[]>{
    return this.http.get<Event[]>(`${environment.apiUrl}/user/events`);
  }
 
}
