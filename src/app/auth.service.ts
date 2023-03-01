import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:8082/";
  constructor(private http: HttpClient, private cookieService:CookieService, private router:Router) { }

  isAuthenticated() {
    let tokenExists: boolean = false;
    if(this.cookieService.get('token')){
      tokenExists = true;
    }
    return tokenExists;
  }

  logout() {
    this.cookieService.delete("token");
  }

  login(username:string, password:string){
    const headers: HttpHeaders = new HttpHeaders()
    .set('Content-type','application/json');

    return this.http.post(`${environment.apiUrl}/signin`, {username, password}, {headers})
    .subscribe({
      next: (token) => {
        this.cookieService.set('token', token.toString())
        this.router.navigate(['/schedule'], {skipLocationChange:false})
        //this.router.navigateByUrl('/schedule');
      },
      error: (err) => {
        Swal.fire("Usuario o contraseña incorrectos")
        this.logout()
      }
    })
    //va a devolver un observable
    // .pipe(map(token => {
    //         this.cookieService.set('token', token.access_token);
    //         return of(true);
    //     }),catchError(error => {
    //         Swal.fire("Usuario o contraseña incorrectos")
    //         this.logout()
    //         return of(false);
    //     })
    // )
  }
}
