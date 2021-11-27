import {NgModule, Provider} from '@angular/core';
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
import {TodosComponent} from './todos/todos.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule} from "@angular/material/snack-bar";
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {PageErrorComponent} from './page-error/page-error.component';
import {MatMenuModule} from "@angular/material/menu";
import {ProfileComponent} from './profile/profile.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {ObjToArrPipe} from './shared/pipes/obj-to-arr.pipe';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TaskDoneCounterPipe} from './shared/pipes/task-done-counter.pipe';
import {LoaderComponent} from "./shared/loader.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ObjIsEmptyPipe} from './shared/pipes/obj-is-empty.pipe';
import {ClipboardModule} from "@angular/cdk/clipboard";
import {DelColumnsPipe} from './shared/pipes/del-columns.pipe';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  "verticalPosition": 'bottom',
  "horizontalPosition": 'start',
  "duration": 7000,
};

const SNACKBAR_PROVIDER: Provider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: matSnackbarDefaultConfig
}

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}

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
    TodosComponent,
    ForgotPasswordComponent,
    PageErrorComponent,
    ProfileComponent,
    ObjToArrPipe,
    TaskDoneCounterPipe,
    LoaderComponent,
    ObjIsEmptyPipe,
    DelColumnsPipe,
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
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    ClipboardModule
  ],
  providers: [
    SNACKBAR_PROVIDER,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
