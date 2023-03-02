import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookieService:CookieService, private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.cookieService.get('token');
    //if(token.length){
      let request = req;
      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${ token }`
          }
        });
        //otra sintaxis
        //const headers = new HttpHeaders({'Authorization': `Bearer ${ token }`})
        //request = req.clone({headers})
      }
    //}

    return next.handle(request)
    .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['/']);
        }
        return throwError( err );
      })
    );
  }

  
}
