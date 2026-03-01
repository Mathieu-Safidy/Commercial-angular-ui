import { inject, Injectable } from '@angular/core';
import { Utils } from '../utils/utils';
import { PostModel } from '../../model/postModel';
import { UserService } from '../userService/user-service';
import { AuthServices } from '../authService/auth.services';

@Injectable({
  providedIn: 'root',
})
export class PostService {
    private http = inject(Utils);
    private authService = inject(AuthServices);

  async getPosts() {
    try {

      const response = await this.http.PGet('/posts');
      return response as PostModel[];
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  async getPostByRole(idUser: string) {
    try {
      const response = await this.http.PGet(`/posts/user/${idUser}`);
      return response as PostModel[];
    } catch (error) {
      console.error('Error fetching posts by role:', error);
      throw error;
    }
  }

  async createPost(postData: { text: string; imageFiles: File[] }) {
    const formData = new FormData();
    const currentUser = await this.authService.currentUserSubject.value;
    formData.append('description', postData.text);
    formData.append('idUser', currentUser?._id || '');
    postData.imageFiles.forEach((file, index) => {
      formData.append(`images`, file);
    });

    try {
      const response = await this.http.PPost('/posts', formData) as PostModel;
      return response;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  async deletePost(postId: string) {
    try {
     return await this.http.PDelete(`/posts/${postId}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  async updatePost(postId: string, text: string) {
    try {
      const response = await this.http.PPatch(`/posts/${postId}`, { description: text }) as PostModel;
      return response;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }
}
