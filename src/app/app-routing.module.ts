import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { LogoutComponent } from './logout/logout.component';
import {ErrorComponent } from './error/error.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './reset-password/change-password/change-password.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserPasswordComponent } from './user-password/user-password.component';
import { PreloginGuardService } from './service/prelogin-guard.service';

// welcome
const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'login/:token', component: LoginComponent},
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [PreloginGuardService]},
  { path: 'resetPassword/changePassword', component: ChangePasswordComponent},
  { path: 'confirmation', component: ConfirmationComponent, canActivate:[PreloginGuardService]},
  // { path: 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
  { path: 'todos', component: ListTodosComponent, canActivate:[RouteGuardService]},
  { path: 'todos/:id', component: TodoComponent, canActivate:[RouteGuardService]},
  { path: 'account', component: UserAccountComponent, canActivate: [RouteGuardService]},
  { path: 'userPassword', component: UserPasswordComponent, canActivate: [RouteGuardService]},
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
