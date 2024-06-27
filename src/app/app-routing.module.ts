import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './movie/movie.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'movie', component: MovieComponent},
  {path: '', component: MovieComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
