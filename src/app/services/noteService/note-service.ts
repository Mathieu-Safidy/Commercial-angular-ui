import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import { Note } from '../../model/noteModel';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
    private http = inject(Utils);

    public async getNotesByProduitId(produitId: string) : Promise<Note[]> {
        return await this.http.PGet(`/notes/produit/${produitId}`) as Note[];
    }

    public async ajouterNote(produitId: string, note: number, commentaire: string) {
        return await this.http.PPost('/notes', { idProduit: produitId, note, commentaire });
    }

}
