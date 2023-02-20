import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interfaces/group.interface';

@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html'
})
export class GroupInfoComponent implements OnInit {

  @Input() group!:Group;
  
  constructor() { }

  ngOnInit(): void {
  }

}
