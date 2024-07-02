import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';

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

  handleLoginAuth() {
    this.authenticationService.authenticationService(this.userName, this.password).subscribe((result)=> {
    this.invalidLogin = false;
    this.loginSuccess = true;
    this.authLoginSuccess = true;
    this.authenticationService.setAuthLoginSuccess(true);
    if (this.userName != 'admin'){
      this.GetUserLoginData();
    }
    else {
      this.router.navigate(['/movie']); 
    }
    
  }, () => {
    this.invalidLogin = true;
    this.loginSuccess = false;
  });      
}

  Login() {
    this.handleLoginAuth();
  }

  GetUserLoginData(){
      let bodyData = {
        username: this.userName,
        password: this.password,
      };
      this.http.post(`${this.apiServerUrl}/api/UsersAPI/LoginUsersRet`, bodyData).subscribe(  (resultData: any) => {
          console.log(resultData);
          this.cookieService.set("id", resultData.id);
          this.cookieService.set("name", resultData.name);
          this.cookieService.set("passwordEncr", resultData.password);
          this.successMessage = 'Login Successful.';
          this.router.navigate(['/movie']); 
          },
          (error: HttpErrorResponse) => {
            this.invalidLogin = true;
            this.loginSuccess = false;
          }
      );
  }

}
