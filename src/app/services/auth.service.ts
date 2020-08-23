import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

export const TOKEN = 'token'
export const USERNAME = 'username'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) { }

  authUser(username, password) {
    return this.http.post<any>(
      `${environment.API_URL}/authenticate`, {
        username, password
      })
      .pipe(
        map(
          data => {
            sessionStorage.setItem(USERNAME, username)
            this.cookieService.set(TOKEN, `Bearer ${data.token}`)
          }
      )
    )
  }

  isUserLoggedIn() {
    return this.cookieService.get(TOKEN) != null
  }

  logout() {
    this.cookieService.delete(TOKEN)
    sessionStorage.removeItem(USERNAME)
  }
  
  getAuthenticatedToken() {
    return this.cookieService.get(TOKEN)
  }


}
