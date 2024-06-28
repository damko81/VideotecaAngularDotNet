import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;
  authLoginSuccess: boolean = false;
  userName: string = ""; 
  name: string = ""; 
  password: string = "";
  id: string = "";
  changePassword: boolean = false;
  invalidChangePassword: boolean = false;
  newPassword: string = "";
  newPasswordConf: string = "";
  message : string = "";
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService, 
              private cookieService: CookieService,
              private usersService: UsersService
             ) { }

  ngOnInit(): void {
    
    if(this.cookieService.get('authLoginSuccess') == 'T'){this.authLoginSuccess = true;}
    else{this.authLoginSuccess = false;}
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    this.id = this.cookieService.get("id");
    this.name = this.cookieService.get("name");
    this.userName = this.cookieService.get("userName");
    this.password = this.cookieService.get("passwordEncr");
    console.log('menu ->' + this.isLoggedIn);
  }

  public resetChangedPassword(): void{
    this.invalidChangePassword = false;
    this.changePassword = false;
    this.newPassword = "";
    this.newPasswordConf = "";
    this.message = "";
  }

  public onOpenModal(mode?: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'edit') {
      this.resetChangedPassword();
      button.setAttribute('data-target', '#updateUsersModal_Menu');
    }
    
    container?.appendChild(button);
    button.click();
  }

  handleLogout() {
    this.authenticationService.logout();
  }

}
