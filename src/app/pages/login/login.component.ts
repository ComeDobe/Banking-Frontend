import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = {};
  errorMessages: Array<string> = [];
  private decodedToken: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  // login() {
  //   this.errorMessages = [];
  //   this.authService.authenticate({
  //     body: this.authRequest
  //   }).subscribe({
  //     next: async (data) => {
  //       localStorage.setItem('token', data.token as string);
  //       const helper = new JwtHelperService();
  //       if (data.token != null) {
  //         const decodedToken = helper.decodeToken(data.token);
  //       }
  //       if (this.decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
  //         await this.router.navigate(['admin/dashboard']);
  //       } else {
  //         await this.router.navigate(['user/dashboard']);
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.errorMessages.push(err.error.errorMessage);
  //     }
  //   });
  // }


  login() {
    this.errorMessages = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: async (data) => {
        localStorage.setItem('token', data.token as string);
        const helper = new JwtHelperService();
        if (data.token != null) {
          this.decodedToken = helper.decodeToken(data.token);
          // if (this.decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
          //   await this.router.navigate(['admin/dashboard']);
          // } else {
          //   await this.router.navigate(['user/dashboard']);
          // }

          if (this.decodedToken.authorities && this.decodedToken.authorities.length > 0 && this.decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
            await this.router.navigate(['admin/dashboard']);
          } else {
            await this.router.navigate(['user/dashboard']);
          }




        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessages.push(err.error.errorMessage);
      }
    });
  }


  async register() {
    await this.router.navigate(['register']);
  }

}
