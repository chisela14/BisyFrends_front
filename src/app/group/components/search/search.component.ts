import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Output() searchInput = new EventEmitter<string>();

  query: string = "";
  search(){
    this.query = this.query.trim();
    if(this.query){
      this.searchInput.emit(this.query);
      this.query = "";
    }
  }

}
