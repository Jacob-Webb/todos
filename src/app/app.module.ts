import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { HttpInterceptorBasicAuthService } from './service/http/http-interceptor-basic-auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule} from '@angular/material/core'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SigninComponent } from './login/signin/signin.component';
import { RegisterComponent } from './login/register/register.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user/user.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { HomeComponent } from './home/home.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    LogoutComponent,
    TodoComponent,
    SigninComponent,
    RegisterComponent,
    ListUsersComponent,
    UserComponent,
    ConfirmationComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    UserAccountComponent,
    UserPasswordComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
