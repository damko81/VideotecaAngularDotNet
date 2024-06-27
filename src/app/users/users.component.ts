import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Users } from './users';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users?: Users[];
  public editUsers?: Users | null;
  public deleteUsers?: Users | null;
  public invalidRegist: boolean = false;
  public changePassword: boolean = false;
  public invalidChangePassword: boolean = false;
  public newPassword: string = "";
  public newPasswordConf: string = "";
  public message : string = "";

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.usersService.getUsers().subscribe(
      (response: Users[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public resetChangedPassword(): void{
    this.invalidChangePassword = false;
    this.changePassword = false;
    this.newPassword = "";
    this.newPasswordConf = "";
    this.message = "";
  }

  public onOpenModal(user: Users | null, mode?: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addUsersModal');
    }
    if (mode === 'edit') {
      this.resetChangedPassword();
      this.editUsers = user;
      button.setAttribute('data-target', '#updateUsersModal');
    }
    if (mode === 'delete') {
      this.deleteUsers = user;
      button.setAttribute('data-target', '#deleteUsersModal');
    }

    container?.appendChild(button);
    button.click();
  }

}
