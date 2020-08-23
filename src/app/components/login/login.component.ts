import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  invalidLogin: boolean
  errorMessage: string

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void { }

  login() {

    this.authService.authUser(this.username, this.password).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['home'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.errorMessage = error.error.message
      }
    )
  }
}
