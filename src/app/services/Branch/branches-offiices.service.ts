import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class BranchesOffiicesService {
  _branch: any;
  constructor( private api: ApiService) {}
  

  postbranch(accountInfo: Account) {
    const seq = this.api.post('branch-offices', accountInfo);
    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {});
    return seq;
  }
  postbranchadd(accountInfo: Account) {
    const seq = this.api.post('branch_offices_add', accountInfo);
    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {});
    return seq;
  }
  getBranch() {
    const seq = this.api.get('branch-offices', null, true);
    seq.subscribe((res: any) => {


    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  /**
   * Log the user out, which forgets the session
   */
  getBranchId() {
    const seq = this.api.get('branch-offices', null, true);
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
    this._branch = null;
  }

  _loggedIn(resp) {
    this._branch = resp.user;
  }

}
