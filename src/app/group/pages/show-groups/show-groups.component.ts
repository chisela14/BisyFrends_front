import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/interfaces/group.interface';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-show-groups',
  templateUrl: './show-groups.component.html'
})
export class ShowGroupsComponent implements OnInit {


  constructor(private groupService:GroupService) { }

  ngOnInit(): void {
    this.groups = this.groupService.getGroups();
  }

  groups:Group[] = [];
  searchGroups(input:string){
    this.groups = this.groupService.searchGroups(input);
  }

  selectedGroup!: Group;
  setGroup(g:Group){
    this.selectedGroup = g;
  }

}
