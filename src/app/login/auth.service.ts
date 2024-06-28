import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public userName: string = "";
  public password: string = "";
  public authLoginSuccess: boolean = false;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createBasicAuthToken(userName: string, password: string) {
    return 'Basic ' + window.btoa(userName + ":" + password)
  }

  registerSuccessfulLogin(userName: string, password: string) {
    let basicAuthToken = this.createBasicAuthToken(userName, password);
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, basicAuthToken);
    this.cookieService.set("userName", userName);
    this.cookieService.set("password", password);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.cookieService.delete("id");
    this.cookieService.delete("name");
    this.cookieService.delete("userName");
    this.cookieService.delete("password");
    this.cookieService.delete("passwordEncr");
    this.cookieService.delete('authLoginSuccess');
    this.authLoginSuccess = false;
    this.userName = "";
    this.password = "";
  }

}
