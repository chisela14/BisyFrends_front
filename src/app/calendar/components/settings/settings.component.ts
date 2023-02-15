import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() changeView = new EventEmitter<string>();

  view(type:string):void{
    this.changeView.emit(type)
  }

}
