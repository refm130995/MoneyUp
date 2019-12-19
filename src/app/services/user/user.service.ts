import {
  Injectable
} from '@angular/core';
import { ApiService } from '../api/api.service';
import { Account } from '../../interfaces/account';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  _user: any;
  constructor( private api: ApiService) {}
  login(accountInfo: Account) {
    const seq = this.api.post('auth/signIn', accountInfo);
    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {});
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    console.log(accountInfo);
    
    const seq = this.api.post('auth/signUp', accountInfo);

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status === 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getUser() {
    const seq = this.api.get('user/perfil', null, true);
    seq.subscribe((res: any) => {


    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  _loggedIn(resp) {
    this._user = resp.user;
  }
}
