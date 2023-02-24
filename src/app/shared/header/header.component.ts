import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  registered!: boolean;
  ngOnInit(): void {
    this.registered = this.authService.isAuthenticated();
  }

}
