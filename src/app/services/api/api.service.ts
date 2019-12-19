import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(public http: HttpClient) {}
    url = 'http://localhost:3000';
    get(endpoint: string, params ?: any, reqOpts ?: any) {
        if (!reqOpts) {
            reqOpts = {};
        } else {
            if (localStorage.getItem('Authorization')) {
                reqOpts = {
                    headers: new HttpHeaders({
                        Authorization: localStorage.getItem('Authorization')
                    })
                };
            }
        }



        // Query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (const k in params) {
                if (params[k] !== undefined) {
                    reqOpts.params = reqOpts.params.append(k, params[k]);
                }
            }
        }
        return this.http.get(this.url + '/' + endpoint, reqOpts);
    }

    post(endpoint: string, body: any, reqOpts ?: any) {
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    }

    put(endpoint: string, body: any, reqOpts ?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts ?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts ?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }
}
