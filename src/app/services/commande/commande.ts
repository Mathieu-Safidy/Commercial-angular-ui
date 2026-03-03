import {inject, Injectable} from '@angular/core';
import {Utils} from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private baseUrl = '/commandes';
  private http = inject(Utils);
  constructor(private utils: Utils) {}

  public async getAll() {
    return this.utils.PGet(this.baseUrl);
  }
  public async getCommandeByIdBoutique( idBoutique : string ) { 
    return this.utils.PGet( `${this.baseUrl}/commandeBoutique/${idBoutique}` ) ;  
  }
  public async valideClientCommande(iduser: string) {
    return await this.http.PPost(`${this.baseUrl}/confirme/${iduser}`, {});
  }
  public async valideClientCommandeStatus(id: string) {
    return await this.http.PPatch(`${this.baseUrl}/valide/${id}`, {});
  }

}

