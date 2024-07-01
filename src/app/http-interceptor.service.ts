import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthService, private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService);
    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
        const authReq = req.clone({
            headers: new HttpHeaders({
                //'Content-Type': 'application/json', // Težava zaradi upload datotek MultipartException: Current request is not a multipart request
                'Authorization': `${authService.getIt()}`,
            })
        });
        return next.handle(authReq);
    } else {
        return next.handle(req);
    }
}

}
