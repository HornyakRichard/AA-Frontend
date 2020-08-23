import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export const TOKEN = 'token'
export const USERNAME = 'username'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authUser(username, password) {
    return this.http.post<any>(
      `${environment.API_URL}/authenticate`, {
        username, password
      })
      .pipe(
        map(
          data => {
            sessionStorage.setItem(USERNAME, username)
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`)
          }
      )
    )
  }

  isUserLoggedIn() {
    return sessionStorage.getItem(TOKEN) != null;
  }

  logout() {
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USERNAME);
  }
  
  getAuthenticatedToken() {
    return sessionStorage.getItem(TOKEN)
  }


}
