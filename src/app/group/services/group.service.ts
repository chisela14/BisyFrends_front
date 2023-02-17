import { Injectable } from '@angular/core';
import { Group } from 'src/app/interfaces/group.interface';
import { UsersService } from '../../user/services/users.service';
import { UserGroup } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  //hasta que recupere los grupos de la api
  users:UserGroup[] = this.userService.getUsers();
  groups: Group[] = [
    {
      name: 'DAW', 
      description: 'desarrollo de aplicaciones web', 
      participants: this.users
    },
    {
      name: 'fotografía', 
      description: 'grupo amateur autodidacta', 
      participants: this.users
    }
  ]

  constructor(private userService:UsersService) { }

  getGroups():Group[]{
    return this.groups;
  }
}
