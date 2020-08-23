import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: number
  user: User
  isFound: boolean = false
  errorMessage

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.userService.getUserById(this.id).subscribe( response => {
      this.user = response
      this.isFound = true
    },
    error => {
      this.isFound = false
      this.errorMessage = error.error.message
    })
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data)
      this.router.navigate(['home'])
    })
  }

}
