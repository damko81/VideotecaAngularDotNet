import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName: string = "";
  public password : string = "";
  public errorMessage : string = 'Invalid Credentials';
  public successMessage: string = "";
  public invalidLogin: boolean = false;
  public loginSuccess: boolean = false;
  public authLoginSuccess: boolean = false;


  constructor( private http: HttpClient,
               private router: Router,
               private authenticationService: AuthService,
               private cookieService: CookieService
             ) { }

  ngOnInit(): void {
    this.userName = this.cookieService.get("userName");
  }

  handleLoginAuth() {
    this.authenticationService.authenticationService(this.userName, this.password).subscribe((result)=> {
    this.invalidLogin = false;
    this.loginSuccess = true;
    this.authLoginSuccess = true;
    this.authenticationService.setAuthLoginSuccess(true);
    this.successMessage = 'Login Successful.';
    this.router.navigate(['/movie']);
  }, () => {
    this.invalidLogin = true;
    this.loginSuccess = false;
  });      
}

  Login() {
    this.handleLoginAuth();
  }

}
