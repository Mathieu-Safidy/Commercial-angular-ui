import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Environments } from '../../environements/environments';

@Injectable({
  providedIn: 'root',
})
export class Utils {
    private BACKEND_URL = Environments.BACKEND+"/api";
    private http = inject(HttpClient);
    public Get = (url: string) => this.http.get(this.BACKEND_URL + url);
    public Post = (url: string, body: any) => this.http.post(this.BACKEND_URL + url, body);
    public Patch = (url: string, body: any) => this.http.patch(this.BACKEND_URL + url, body);
    public Delete = (url: string) => this.http.delete(this.BACKEND_URL + url);
    
    public PGet = (url: string) => firstValueFrom(this.http.get(this.BACKEND_URL + url));
    public PPost = (url: string, body: any) => firstValueFrom(this.http.post(this.BACKEND_URL + url, body));
    public PPatch = (url: string, body: any) => firstValueFrom(this.http.patch(this.BACKEND_URL + url, body));
    public PDelete = (url: string) => firstValueFrom(this.http.delete(this.BACKEND_URL + url));
    

} 
