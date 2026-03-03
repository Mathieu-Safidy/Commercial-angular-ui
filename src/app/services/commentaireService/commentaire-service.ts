import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import { CommentModel } from '../../model/commentModel';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  private http = inject(Utils);

  async getCommentsByPostId(postId: string) {
    try {
      const response = await this.http.PGet(`/commentaires/post/${postId}`);
      return response as CommentModel[];
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  async updateComment(commentId: string, updatedContent: string) {
    try {
      const response = await this.http.PPatch(`/commentaires/${commentId}`, { contenu: updatedContent }) as CommentModel;
      return response;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  async createComment(commentData: { contenu: string; idPost: string; idUser: string }) {
    try {
      const response = await this.http.PPost('/commentaires', commentData) as CommentModel;
      return response;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  async deleteComment(commentId: string) {
    try {
      await this.http.PDelete(`/commentaires/${commentId}`);
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}
