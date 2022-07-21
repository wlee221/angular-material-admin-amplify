import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticatorService } from '@aws-amplify/ui-angular';

// [future amplify improvement]: this type should be exported from ui-angular
interface Subscription {
  unsubscribe(): void;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private authSubscription: Subscription;
  constructor(
    private router: Router,
    private authenticator: AuthenticatorService
  ) {}

  ngOnInit() {
    /**
     * Note: authenticator.subscribe subscribes to authenticator state changes.
     * It is however *not* a public API and is mostly intended for internal use.
     *
     * That being said, it is very useful for making route changes and so I'll
     * use it here. This DX will be improved from Amplify UI end soon!
     */
    // [future amplify improvement]: subscribe should be a public API!
    this.authSubscription = this.authenticator.subscribe(() => {
      const { authStatus } = this.authenticator;

      if (authStatus === 'authenticated') {
        console.debug(
          '[login.component] user has authenticated, going to /dashboard'
        );
        this.onLogin();
      }
    });
  }

  onLogin() {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
