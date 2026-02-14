import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Utils {
    private http = inject(HttpClient);
    
    public Get = (url: string) => this.http.get(url);
    public Post = (url: string, body: any) => this.http.post(url, body);
    public Patch = (url: string, body: any) => this.http.patch(url, body);
    public Delete = (url: string) => this.http.delete(url);
    
    public PGet = (url: string) => firstValueFrom(this.http.get(url));
    public PPost = (url: string, body: any) => firstValueFrom(this.http.post(url, body));
    public PPatch = (url: string, body: any) => firstValueFrom(this.http.patch(url, body));
    public PDelete = (url: string) => firstValueFrom(this.http.delete(url));
    

}
