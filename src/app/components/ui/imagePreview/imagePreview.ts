// image-preview-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image-preview-dialog',
  standalone: true,
  templateUrl: './imagePreview.html',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  styleUrl: './imagePreview.css'
})
export class ImagePreviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImagePreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }
  ) {}
}