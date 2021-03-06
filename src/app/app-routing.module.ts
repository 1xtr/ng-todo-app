import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {PageErrorComponent} from "./page-error/page-error.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./shared/auth.guard";
import {TodoComponent} from "./todo/todo.component";
import {MergeTodoComponent} from "./components/merge-todo/merge-todo.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 't/:todoId', component: TodoComponent, canActivate: [AuthGuard]},
  {path: 't', redirectTo: '/', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'merge', component: MergeTodoComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {
    path: 'auth', component: AuthComponent, children: [
      {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
    ]
  },
  {path: '**', component: PageErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
