import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interfaces/group.interface';
import { User, UserGroup } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { GroupService } from '../../services/group.service';
import { GroupDto } from '../../../interfaces/group.interface';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html'
})
export class GroupInfoComponent implements OnInit {

  @Input() group!:GroupDto;
  participants:User[]=[];
  constructor(private groupService:GroupService) {}

  ngOnInit(): void {
    this.groupService.getGroup(this.group.id)
    .subscribe({
      next: ({usersGroup})=>{
        let groupUsers:User[] = [];
        for(let ug of usersGroup){
          groupUsers.push(ug.user);
        }
        this.participants = groupUsers;
      },
      error: ()=>{Swal.fire("Error al obtener los participantes de grupo")}
    })
  }

}
