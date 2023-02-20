import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/interfaces/group.interface';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html'
})
export class GroupListComponent implements OnInit {

  @Input() groups:Group[] = [];
  constructor() { }

  ngOnInit(): void {}

  @Output() selectedGroup = new EventEmitter<Group>();

  focusGroup(g:Group){
    this.selectedGroup.emit(g);
  }
}
