import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/user/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') regForm!: NgForm;
  user:User={username: "", password: "", name: "", email: "", picture:""}
  password2:string = "";
  file!:File;

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
  }

  notValid(field:string):boolean{
    return this.regForm?.controls[field]?.invalid && this.regForm?.controls[field]?.touched
  }

  save(){
    
  }

}
