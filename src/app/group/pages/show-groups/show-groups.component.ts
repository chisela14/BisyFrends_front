import { Component, OnInit } from '@angular/core';
import { Group, GroupDto } from 'src/app/interfaces/group.interface';
import Swal from 'sweetalert2';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-show-groups',
  templateUrl: './show-groups.component.html'
})
export class ShowGroupsComponent implements OnInit {

  groups:GroupDto[] = [];
  constructor(private groupService:GroupService) { }

  ngOnInit(): void {
    this.groupService.getGroups()
    .subscribe({
      next:(resp)=>{this.groups=resp},
      error:(err)=>{
        Swal.fire("Fallo al recuperar los grupos de la api")
      }
    })
  }

  
  searchGroups(input:string){
    this.groupService.searchGroups(input)
    .subscribe({
      next:(resp)=>{
        if(resp.length){
          this.groups=resp
        }else{
          Swal.fire("No se encontraron grupos cuyo nombre contenga '" + input + "'")
        }
        
      },
      error:(err)=>{
        Swal.fire("Fallo al buscar grupos")
      }
    })
  }

  selectedGroup!: GroupDto;
  setGroup(g:GroupDto){
    this.selectedGroup = g;
  }

}
