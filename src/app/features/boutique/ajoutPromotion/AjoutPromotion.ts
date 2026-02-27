import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { LucideAngularModule, Tag, Percent, Calendar, X, Check, ArrowRight } from 'lucide-angular';
import {PromotionService} from '../../../services/promotionService/promotion-service';

export interface PromotionPayload {
  idEvenement: string;
  dateDebut: Date;
  dateFin: Date;
  idProduit: string;
  reduction: number;
}

@Component({
  selector: 'app-ajout-promotion-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    LucideAngularModule,
  ],
  templateUrl: './AjoutPromotion.html',
  styleUrls: ['./AjoutPromotion.css'],
})
export class AjoutPromotionDialogComponent {
  readonly Tag = Tag;
  readonly Percent = Percent;
  readonly Calendar = Calendar;
  readonly X = X;
  readonly Check = Check;
  readonly ArrowRight = ArrowRight;

  readonly quickValues = [10, 20, 30, 50];

  // Contrôle l'affichage de l'overlay succès
  showSuccess = signal(false);

  private readonly ID_EVENEMENT = '698dff42709de29d54628ca3';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AjoutPromotionDialogComponent>,
    private promotionService: PromotionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      reduction: [10, [Validators.required, Validators.min(1), Validators.max(90)]],
      dateDebut: [null, Validators.required],
      dateFin: [null, Validators.required],
    });
  }
   async createPromotion() { 
     const payload : PromotionPayload = {
      idEvenement: this.ID_EVENEMENT,
      idProduit: this.data?._id ?? '',
      dateDebut: this.form.value.dateDebut,
      dateFin: this.form.value.dateFin,
      reduction: this.form.value.reduction,
    };  
    await this.promotionService.createPromotion(payload);
    this.showSuccess.set(true);
  } 
  setReduction(val: number) {
    this.form.get('reduction')?.setValue(val);
  }

  getPrixFinal(): number {
    const base = this.data?.prixInitial ?? 0;
    const r = this.form.get('reduction')?.value ?? 0;
    return +(base * (1 - r / 100)).toFixed(2);
  }

  closeSuccess() {
    this.showSuccess.set(false);
    // Ferme le dialog parent en renvoyant le résultat
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close(null);
  }
}
