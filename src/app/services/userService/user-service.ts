import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = '/users';
  private http = inject(Utils);
  constructor(private utils: Utils) {}

  public async createUser(data : any) {
    return this.utils.PPost(this.baseUrl, data);
  } 

  public async getAllUsers() {
    return this.utils.PGet(this.baseUrl);
  } 

public async deleteUser(idUser: string) { 
  return this.utils.PDelete(`${this.baseUrl}/${idUser}`);
}


}
