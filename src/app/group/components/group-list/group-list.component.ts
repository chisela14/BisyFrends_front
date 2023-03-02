import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupDto } from '../../../interfaces/group.interface';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {

  @Input() groups:GroupDto[] = [];
  constructor() { }

  ngOnInit(): void {}

  @Output() selectedGroup = new EventEmitter<GroupDto>();

  focusGroup(g:GroupDto){
    this.selectedGroup.emit(g);
  }
}
