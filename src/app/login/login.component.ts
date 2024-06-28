import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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


  constructor(
              private http: HttpClient,
              private router: Router,
              private cookieService: CookieService
             ) { }

  ngOnInit(): void {
    this.userName = this.cookieService.get("userName");
  }

  Login() {
    
  }

}
