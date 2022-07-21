import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    console.debug('[auth.guard] running protected route guard');

    /**
     * Here, I chose to use `Auth.currentAuthenticatedUser` instead of `authStatus`
     * so that we don't have to worry about `authStatus` being in `configuring` state.
     *
     * https://ui.docs.amplify.aws/react/connected-components/authenticator/headless#authentication-check
     */
    return Auth.currentAuthenticatedUser()
      .then(() => {
        console.debug('[auth.guard] confirmed that user is authenticated');
        return true;
      })
      .catch(() => {
        console.debug('[auth.guard] user is not yet authenticated!');
        this.router.navigate(['/login']);
        return false;
      });
  }
}
