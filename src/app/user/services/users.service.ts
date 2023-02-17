import { Injectable } from '@angular/core';
import { UserGroup } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //hasta que recupere los datos de la api
  users: UserGroup[] = [
    {username: 'ioliasa', picture: ''},
    {username: 'joadelvia', picture: ''}
  ]

  constructor() { }

  getUsers():UserGroup[]{
    return this.users;
  }
}
