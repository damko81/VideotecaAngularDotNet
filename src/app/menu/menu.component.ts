import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;
  authLoginSuccess: boolean = false;
  username: string = ""; 
  name: string = ""; 
  password: string = "";
  id: string = "";
  changePassword: boolean = false;
  invalidChangePassword: boolean = false;
  newPassword: string = "";
  newPasswordConf: string = "";
  message : string = "";
  
  ngOnInit(): void {

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
    
  }

}
