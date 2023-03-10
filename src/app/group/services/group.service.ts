import { Injectable } from '@angular/core';
import { Group, GroupDto } from 'src/app/interfaces/group.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroup(id:number){
    return this.http.get<Group>(`${environment.apiUrl}/group/${id}`);
  }

  getGroups(){
    return this.http.get<GroupDto[]>(`${environment.apiUrl}/user/groups`);
  }
  
}
