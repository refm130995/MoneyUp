import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  _service: any;
  constructor( private api: ApiService) {}


  getServices() {
    const seq = this.api.get('services', null, true);
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
    this._service = null;
  }

  _loggedIn(resp) {
    this._service = resp.user;
  }
}
