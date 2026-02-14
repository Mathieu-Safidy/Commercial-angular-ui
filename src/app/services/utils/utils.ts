import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Utils {
    
    public static Get = (url: string) => inject(HttpClient).get(url);
    public static Post = (url: string, body: any) => inject(HttpClient).post(url, body);
    public static Patch = (url: string, body: any) => inject(HttpClient).patch(url, body);
    public static Delete = (url: string) => inject(HttpClient).delete(url);
    
    public static PGet = (url: string) => firstValueFrom(inject(HttpClient).get(url));
    public static PPost = (url: string, body: any) => firstValueFrom(inject(HttpClient).post(url, body));
    public static PPatch = (url: string, body: any) => firstValueFrom(inject(HttpClient).patch(url, body));
    public static PDelete = (url: string) => firstValueFrom(inject(HttpClient).delete(url));
    

} 
