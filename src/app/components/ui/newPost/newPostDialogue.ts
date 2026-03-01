// new-post-dialog.component.ts
import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { Image as ImageIcon, LucideAngularModule } from 'lucide-angular';

export interface NewPostResult {
  text: string;
  title: string;
  category: string;
  imagePreviews: string[];
  images: File[];
}

// Données optionnelles passées en mode édition
export interface NewPostDialogData {
  post?: {
    id: any;
    text: string;
    title?: string;
    category?: string;
    image?: string[];
  };
}

@Component({
  selector: 'app-new-post-dialog',
  standalone: true,
  templateUrl: './newPostDialogie.html',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    LucideAngularModule,
  ],
})
export class NewPostDialogComponent implements OnDestroy {
  readonly ImageIcon = ImageIcon;

  // true si on édite un post existant, false si création
  isEditMode: boolean = false;

  form = signal<NewPostResult & { imageFiles: File[] }>({
    text: '',
    title: '',
    category: 'info',
    imagePreviews: [],
    imageFiles: [],
    images: [],
  });

  constructor(
    private dialogRef: MatDialogRef<NewPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: NewPostDialogData | null
  ) {
    // Si un post est passé → mode édition, on pré-remplit le formulaire
    if (this.data?.post) {
      this.isEditMode = true;
      this.form.update((prev) => ({
        ...prev,
        text: this.data!.post!.text ?? '',
        title: this.data!.post!.title ?? '',
        category: this.data!.post!.category ?? 'info',
        imagePreviews: [...(this.data!.post!.image ?? [])],
      }));
      // En mode édition les images existantes sont des URLs, pas des File
      // imageFiles reste vide pour les images déjà uploadées
    }
  }

  // ─── Gestion images ───

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const MAX = 4;
    const remaining = MAX - this.form().imagePreviews.length;

    if (remaining <= 0) {
      alert(`Vous avez déjà atteint la limite de ${MAX} images.`);
      input.value = '';
      return;
    }

    Array.from(input.files).slice(0, remaining).forEach((file) => {
      const url = URL.createObjectURL(file);
      this.form.update((prev) => ({
        ...prev,
        imagePreviews: [...prev.imagePreviews, url],
        imageFiles: [...prev.imageFiles, file],
      }));
    });

    input.value = '';
  }

  removeImage(index: number): void {
    // Révoquer seulement les object URLs (pas les URLs serveur en mode édition)
    const url = this.form().imagePreviews[index];
    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
    this.form.update((prev) => ({
      ...prev,
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
      imageFiles: prev.imageFiles.filter((_, i) => i !== index),
    }));
  }

  ngOnDestroy(): void {
    // Libérer uniquement les blob URLs créées localement
    this.form().imagePreviews
      .filter((url) => url.startsWith('blob:'))
      .forEach((url) => URL.revokeObjectURL(url));
  }

  // ─── Soumission ───

  get submitLabel(): string {
    return this.isEditMode ? 'Enregistrer' : 'Publier';
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Modifier la publication' : 'Nouvelle actualité';
  }

  publish(): void {
    if (!this.form().text.trim() && !this.form().imagePreviews.length) return;

    const result: NewPostResult = {
      text: this.form().text,
      title: this.form().title,
      category: this.form().category,
      imagePreviews: [...this.form().imagePreviews],
      images: [...this.form().imageFiles],
    };

    this.dialogRef.close(result);
  }
}