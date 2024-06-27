import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {path: 'movie', component: MovieComponent},
  {path: '', component: MovieComponent},
  {path: 'users', component: UsersComponent},
  {path: '', component: UsersComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: RegisterComponent},
  {path: 'file-upload', component: FileUploadComponent},
  {path: '', component: FileUploadComponent},
  {path: 'logout', component: MovieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
