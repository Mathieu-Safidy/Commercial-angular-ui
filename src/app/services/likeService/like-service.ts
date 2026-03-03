import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private http = inject(Utils);

  async likePost(idPost: string, idUser: string) {
    try {
      const response = await this.http.PPost('/likes', { idPost, idUser });
      return response;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  async unlikePost(idPost: string, idUser: string) {
    try {
      const response = await this.http.PDelete(`/likes?idPost=${idPost}&idUser=${idUser}`);
      return response;
    } catch (error) {
      console.error('Error unliking post:', error);
      throw error;
    }
  }

  
}
