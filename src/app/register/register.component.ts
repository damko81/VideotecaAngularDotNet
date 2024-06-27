import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  private apiServerUrl = environment.apiBaseUrl;

  name: string ="";
  username: string ="";
  password: string ="";
  passwordConf: string = "";
  public invalidRegist: boolean = false;
  public message: string = "";

  constructor(private http: HttpClient, private router: Router){ }

  save(){

    if (this.password != this.passwordConf){
      this.message = "Confirm Password Invalid";
      this.invalidRegist = true;
    }
    else{

      let bodyData = {
        "name" : this.name,
        "username" : this.username,
        "password" : this.password
      };
      this.http.post(`${this.apiServerUrl}/api/UsersAPI`,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
      {
        if (resultData == "" || resultData == null){
              this.invalidRegist = true;
              this.message = "User Registered Faild";
        }
        else{  
          
              this.message = "User Registered Successfully";
              this.router.navigate(['/login']);  
        }
      });
    }
  }

}
