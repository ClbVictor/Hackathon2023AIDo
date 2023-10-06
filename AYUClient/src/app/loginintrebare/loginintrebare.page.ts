import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginintrebare',
  templateUrl: './loginintrebare.page.html',
  styleUrls: ['./loginintrebare.page.scss'],
})
export class LoginintrebarePage implements OnInit {
  user:any;
  loggedIn:any;
  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  
}