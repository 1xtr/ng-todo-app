import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {TodoComponent} from './todo/todo.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import { CreateTodoListComponent } from './create-todo-list/create-todo-list.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule} from "@angular/material/snack-bar";
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PageErrorComponent } from './page-error/page-error.component';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'bottom',
  horizontalPosition: 'start',
  duration: 4000,
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    TodoComponent,
    TodoListComponent,
    CreateTodoListComponent,
    ForgotPasswordComponent,
    PageErrorComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: matSnackbarDefaultConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
