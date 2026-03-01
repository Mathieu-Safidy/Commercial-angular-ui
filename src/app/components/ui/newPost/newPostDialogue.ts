// ─────────────────────────────────────────────
// new-post-dialog.component.ts
// ─────────────────────────────────────────────
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { ImageIcon, LucideAngularModule } from 'lucide-angular';

export interface NewPostResult {
  text: string;
  title: string;
  category: string;
  imagePreviews: string[];
  images: File[];
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
    LucideAngularModule
  ],
})
export class NewPostDialogComponent {
  form: NewPostResult & { imageFiles: File[] } = {
    text: '',
    title: '',
    category: 'info',
    imagePreviews: [],
    imageFiles: [],
    images: []
  };

  readonly ImageIcon = ImageIcon;


  constructor(private dialogRef: MatDialogRef<NewPostDialogComponent>) {}

onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;

  const MAX = 4;
  const remaining = MAX - this.form.imagePreviews.length; // places restantes

  if (remaining <= 0) {
    alert(`Vous avez déjà atteint la limite de ${MAX} images.`);
    input.value = '';
    return;
  }

  const files = Array.from(input.files).slice(0, remaining); // coupe si trop

  files.forEach((file) => {
    const url = URL.createObjectURL(file);
    this.form.imagePreviews.push(url);
    this.form.imageFiles.push(file);
  });

  input.value = '';
}

// Libérer la mémoire à la fermeture
ngOnDestroy(): void {
  this.form.imagePreviews.forEach((url) => URL.revokeObjectURL(url));
}

  removeImage(index: number): void {
    this.form.imagePreviews.splice(index, 1);
    this.form.imageFiles.splice(index, 1);
  }

  publish(): void {
    if (!this.form.text.trim() && !this.form.imagePreviews.length) return;
    const result: NewPostResult = {
      text: this.form.text,
      title: this.form.title,
      category: this.form.category,
      imagePreviews: [...this.form.imagePreviews],
      images: [...this.form.imageFiles]
    };
    this.dialogRef.close(result);
  }
}


// ─────────────────────────────────────────────
// Dans votre composant parent (feed.component.ts)
// ─────────────────────────────────────────────
// import { MatDialog } from '@angular/material/dialog';
// import { NewPostDialogComponent, NewPostResult } from './new-post-dialog.component';

// Injecter MatDialog dans le constructeur :
// constructor(private dialog: MatDialog) {}




// ─────────────────────────────────────────────
// styles.scss (global) — arrondir le dialog Material
// ─────────────────────────────────────────────
/*
.rounded-dialog .mat-mdc-dialog-surface {
  border-radius: 1.25rem !important;
  overflow: hidden;
}
*/