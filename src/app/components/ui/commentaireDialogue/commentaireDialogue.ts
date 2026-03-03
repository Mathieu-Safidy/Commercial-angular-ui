// comment-dialog.component.ts
import { Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { Check, LucideAngularModule, MessageSquareMore, Pencil, Send, Trash2, X } from 'lucide-angular';
import { CommentaireService } from '../../../services/commentaireService/commentaire-service';
import { AuthServices } from '../../../services/authService/auth.services';
import { CommentModel } from '../../../model/commentModel';

// ─── Interface alignée sur le schéma MongoDB ───
export interface Commentaire {
  _id?: string;
  idPublication: string;
  idUser: string;
  contenu: string;
  createdAt: Date;
  deletedAt?: Date | null;
}

export interface CommentDialogData {
  idPublication: string;
  comments: CommentModel[];
}

@Component({
  selector: 'app-comment-dialog',
  standalone: true,
  templateUrl: './commentaireDialogue.html',
  imports: [
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    LucideAngularModule,
  ],
})
export class CommentDialogComponent {
  readonly MessageSquareMore = MessageSquareMore;
  readonly SendIcon = Send;

  newComment = '';

    private dialogRef = inject(MatDialogRef<CommentDialogComponent>);
    private commentaireService = inject(CommentaireService);
    private authService = inject(AuthServices);
    readonly PencilIcon = Pencil;
    readonly TrashIcon = Trash2;
    readonly CheckIcon = Check;
    readonly XIcon = X;
    user = this.authService.currentUserSubject.value || null ;
    userId = this.user?._id;

editingId = signal<string | null>(null);
editingText = signal('');

editComment(comment: CommentModel): void {
  this.editingId.set(comment._id ?? null);
  this.editingText.set(comment.contenu);
}

cancelEdit(): void {
  this.editingId.set(null);
  this.editingText.set('');
}

async confirmEdit(comment: CommentModel) {
  if (!this.editingText().trim()) return;
  comment.contenu = this.editingText().trim();
  let updatedComment = await this.commentaireService.updateComment(comment._id!, comment.contenu);
//   Object.assign(comment, updatedComment);
  // appelez votre service ici : this.CommentModelService.updateComment(comment)
  if (updatedComment) {
    this.cancelEdit();
  }
}

deleteComment(comment: CommentModel): void {
  const index = this.data.comments.indexOf(comment);
  if (index !== -1) this.data.comments.splice(index, 1);
  this.commentaireService.deleteComment(comment._id!)
  // appelez votre service ici : this.commentaireService.deleteComment(comment._id)
}


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogData
  ) {}

  async submitComment() {
    if (!this.newComment.trim()) return;

    const comment: CommentModel = {
      idPost: this.data.idPublication,
      idUser: this.authService.currentUserSubject.value || '',        // ← remplacer par l'id utilisateur connecté
      contenu: this.newComment.trim(),
      createdAt: new Date(),
      deletedAt: null,
    };

    let createdComment = await this.commentaireService.createComment({
        idPost: this.data.idPublication,
        contenu: comment.contenu,
        idUser: (comment.idUser as User)._id,
    })

    // Ajoute localement pour un affichage immédiat (optimistic update)
    if (createdComment) {
        this.data.comments.push(comment);
        this.newComment = '';
    }

    // this.dialogRef.close(comment)

    // Retourne le nouveau commentaire au parent pour appel API
    // Le parent récupère via dialogRef.afterClosed() si besoin
    // ou vous pouvez appeler votre service directement ici
  }
}