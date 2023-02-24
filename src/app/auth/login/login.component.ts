import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

export interface LoginCredentials{
  username: string,
  password:string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm!: NgForm;
  user:LoginCredentials = {username:"", password:""};

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  notValid(field:string):boolean{
    return this.loginForm?.controls[field]?.invalid && this.loginForm?.controls[field]?.touched
  }

  save(){
    this.authService.login(this.user.username, this.user.password)
  }

}
