import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/user/services/users.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  @ViewChild('regForm') regForm!: NgForm;
  user:User={username: "", password: "", name: "", email: "", picture:""}
  password2:string = "";
  file!:File;

  constructor(private userService:UsersService, private router:Router) { }

  ngOnInit(): void {
  }

  notValid(field:string):boolean{
    return this.regForm?.controls[field]?.invalid && this.regForm?.controls[field]?.touched
  }

  save(){
    if(this.regForm?.controls['password']?.value != this.password2){
      Swal.fire("Las contraseñas no coinciden")
    }else{
      console.log(this.user)
      this.userService.addUser(this.user, this.file)
      .subscribe({
        next:()=>this.router.navigateByUrl('/verify'),
        error:()=>{Swal.fire("No se podido añadir el usuario")}
      });
    }
    
  }

}
