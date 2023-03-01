import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  
  setHeader(){
    return this.authService.isAuthenticated();
  }

  onLoginPage():boolean{
    let result = false;
    if(this.router.url.includes('login')){
      result = true;
    }
    return result;
  }

}
