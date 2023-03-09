import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  today:Date;
  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
  }

}
