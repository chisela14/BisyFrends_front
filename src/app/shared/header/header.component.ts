import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  registered!: boolean;
  ngOnInit(): void {
    this.registered = this.authService.isAuthenticated();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
