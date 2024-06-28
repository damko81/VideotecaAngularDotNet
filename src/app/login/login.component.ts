import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';
import { Users } from '../users/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private apiServerUrl = environment.apiBaseUrl;

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

  Login() {

    let bodyData = {
      userName: this.userName,
      password: this.password,
    }; 

    this.http.post(`${this.apiServerUrl}/api/UsersAPI/LoginUsersRet`, bodyData).subscribe( 
     (resultData: any) => {
        console.log(resultData);
        this.authenticationService.registerSuccessfulLogin(this.userName, this.password)
        this.cookieService.set("id", resultData.id);
        this.cookieService.set("name", resultData.name);
        this.cookieService.set("passwordEncr", resultData.password);
        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Successful.';
        this.router.navigate(['/movie']); 
      },
      (error: HttpErrorResponse) => {
        this.invalidLogin = true;
        this.loginSuccess = false;
        this.errorMessage = "Incorrect Username and Password not match";
      }
    );

  }

}
