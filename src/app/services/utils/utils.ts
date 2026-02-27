import {HttpClient, HttpHeaders} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Environments } from '../../environements/environments';
import {AuthServices} from '../authService/auth.services';

@Injectable({
  providedIn: 'root',
})
export class Utils {

    // authService = inject(AuthServices);
    // private getHeaders(credentials: boolean, tokens?: string) {
    //   // const token = this.authService.accessTokenSubject.value ;
    //   const token = localStorage.getItem('accessToken');
    //   console.log("Berear Token :::: ",token) ;
    //   const headerAuth = new HttpHeaders({
    //         Authorization: `Bearer ${tokens ? token : token}`,
    //       })
    //   return {
    //     // ...headerAuth,
    //     headers: { Authorization : `Bearer ${tokens ? token : token}`},
    //     withCredentials: credentials
    //   }
    // }

    private BACKEND_URL = Environments.BACKEND+"/api";
    private http = inject(HttpClient);
    public Get = (url: string) => this.http.get(this.BACKEND_URL + url);
    public Post = (url: string, body: any) => this.http.post(this.BACKEND_URL + url, body);
    public Patch = (url: string, body: any) => this.http.patch(this.BACKEND_URL + url, body);
    public Delete = (url: string) => this.http.delete(this.BACKEND_URL + url);

    public PGet = (url: string, credentials?: boolean) => firstValueFrom(this.http.get(this.BACKEND_URL + url, { withCredentials: credentials || true }));
    public PPost = (url: string, body: any, credentials?: boolean) => firstValueFrom(this.http.post(this.BACKEND_URL + url, body, { withCredentials: credentials || true }));
    public PPatch = (url: string,  body: any, credentials?: boolean) => firstValueFrom(this.http.patch(this.BACKEND_URL + url, body, { withCredentials: credentials || true }));
    public PDelete = (url: string ,credentials?: boolean) => firstValueFrom(this.http.delete(this.BACKEND_URL + url, { withCredentials: credentials || true }));

}
