import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { UserService } from 'src/app/services/user.service';
import { User } from '../../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[]
  deleteError: boolean = false

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshUsers()
  }

  refreshUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data
    })
  }

  deleteUser(id: number) {
    console.log(id)
    this.userService.deleteUser(id).subscribe(() => {
      this.refreshUsers()
      this.deleteError = false
    },
    () => {
      this.deleteError = true
    })
  }

  getUserById(id: number) {
    this.router.navigate(['home',id])
  }

}
