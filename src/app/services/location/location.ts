import {inject, Injectable} from '@angular/core';
import {Utils} from '../utils/utils';


export interface DetailLocationInput {
  idBox: string;
  dateDebut: string;
  prixFinal : string;
}

@Injectable({
  providedIn: 'root',
})
export class Location {
  private baseUrl = '/locations';
  private http = inject(Utils);
  constructor(private utils: Utils) {}

  public async createLocationWithDetails(note: string, idUser: string, details: DetailLocationInput[]) {
    return await this.http.PPost(`${this.baseUrl}/create-with-details`, {
      note,
      idUser,
      details
    });
  }
  public async validateLocationBox(idUser: string, idBox: string) {
    return await this.http.PPatch(`${this.baseUrl}/validate/${idUser}/${idBox}`, {} );
  }
}
