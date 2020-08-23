import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../user';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.API_URL}/user`)
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.API_URL}/user/${id}`)
  }

  getUserById(id: number) {
    return this.http.get<User>(`${environment.API_URL}/user/${id}`)
  }

  updateUser(user : User) {
    return this.http.post(`${environment.API_URL}/user`, user)
  }
}
