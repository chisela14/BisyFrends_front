import { Injectable } from '@angular/core';
import { User, UserGroup } from 'src/app/interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  //no se hace nada con la respuesta
  addUser(user:User, file:File){
    const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'})
    return this.http.post(`${environment.apiUrl}/signup`, [user, file], {headers});
  }
}
