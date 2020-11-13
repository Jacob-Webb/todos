import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../list-users/list-users.component';
import { API_URL, REGISTER_URL, RESET_PASSWORD_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  retrieveAllUsers() {
    return this.http.get<User[]>(`${API_URL}/users`)
  }

  deleteUser(id) {
    return this.http.delete(`${API_URL}/users/${id}`)
  }

  retrieveUserById(id) {
    return this.http.get<User>(`${API_URL}/users/${id}`)
  }

  retrieveUserByEmail(email) {
    return this.http.get<User>(`${API_URL}/users/${email}`)
  }

  updateUser(id, user) {
    return this .http.put(`${API_URL}/users/${id}`, user)
  }

  createUser(user) {
    return this.http.post(`${API_URL}/users`, user);
  }

  registerUser(user) {
    return this.http.post(`${REGISTER_URL}`, user, {observe: 'response'});
  }

  confirmConfirmationToken(token) {
    return this.http.post(`${REGISTER_URL}/confirm`, token);
  }

  isNewUser(user) {
    return this.http.post(`${REGISTER_URL}/verify`, user);
  }

  confirmPassword(email, newPass, currPass) {
    return this.http.patch(`${API_URL}/users/${email}/${newPass}`, currPass, {observe: 'response'})
  }

  resetPassword(email) {
    return this.http.post(`${RESET_PASSWORD_URL}`, email);
  }

  confirmResetPasswordToken(token) {
    return this.http.post(`${RESET_PASSWORD_URL}/confirm`, token);
  }

  savePasswordReset(token, email) {
    return this.http.post(`${RESET_PASSWORD_URL}/savePassword?resetToken=` + token, email, {observe: 'response'});
  }

}
