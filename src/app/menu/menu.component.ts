import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @ViewChild('closebutton') closebutton: ElementRef | undefined

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

  public onUpdateUsers(user: Users): void{
 
    if (this.newPassword != this.newPasswordConf){
       this.message = "Confirm New Password Invalid";
       this.invalidChangePassword = true;
    }
    else{
      this.closebutton?.nativeElement.click();
      if(this.newPassword != ""){user.password=this.newPassword}
      this.usersService.updateUsers(user).subscribe(
        (response: Users) => {
          console.log(response);
          this.authenticationService.logout();
          this.cookieService.set("userName",this.userName);
          this.router.navigate(['/login']); 
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
   }
  }

  public onChangePassword(): void{
    this.changePassword = true;
  }

  handleLogout() {
    this.authenticationService.logout();
  }

}
