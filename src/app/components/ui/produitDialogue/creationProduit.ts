import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '../button';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  LucideAngularModule,
  X, Package, Tag, Store, Layers, DollarSign,
  FileText, CheckCircle2, ImagePlus, Trash2, Upload
} from 'lucide-angular';
import { CategorieService } from '../../../services/categorie-service/categorie-service';
import { Environments } from '../../../environements/environments';
interface Categorie {
  _id: string;
  nom: string;
  description?: string;
}

@Component({
  selector: 'app-product-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ButtonComponent,
    LucideAngularModule,
  ],
  template: `
    <div class="relative w-full bg-background flex flex-col overflow-hidden" style="max-height: 90vh;">

      <!-- Header -->
      <div class="flex items-center justify-between px-8 py-6 border-b border-border">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <lucide-icon [img]="Package" class="w-5 h-5 text-primary"></lucide-icon>
          </div>
          <div>
            <h2 class="text-xl font-black tracking-tight">
              {{ isEdit() ? 'Modifier le produit' : 'Nouveau produit' }}
            </h2>
            <p class="text-xs text-muted-foreground font-medium">
              {{ isEdit() ? 'Mettez à jour les informations du produit' : 'Ajoutez un produit à votre catalogue' }}
            </p>
          </div>
        </div>
        <button
          (click)="close()"
          class="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl p-2 transition-all"
        >
          <lucide-icon [img]="X" class="w-5 h-5"></lucide-icon>
        </button>
      </div>

      <!-- Form Body -->
      <div class="flex-1 overflow-y-auto px-8 py-6">
        <form [formGroup]="form" class="space-y-6">

          <!-- IMAGE UPLOAD SECTION -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <lucide-icon [img]="ImagePlus" class="w-3.5 h-3.5"></lucide-icon>
              Image du produit
            </label>

            <!-- Drop zone (no image) -->
            <div *ngIf="!previewUrl()">
              <label
                for="image-upload"
                class="flex flex-col items-center justify-center w-full h-44 rounded-2xl border-2 border-dashed cursor-pointer transition-all"
                [class]="isDragging()
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-muted/20 hover:bg-primary/5 hover:border-primary/40'"
                (dragover)="onDragOver($event)"
                (dragleave)="isDragging.set(false)"
                (drop)="onDrop($event)"
              >
                <div class="flex flex-col items-center gap-3 text-center pointer-events-none">
                  <div class="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                    <lucide-icon [img]="Upload" class="w-5 h-5 text-muted-foreground"></lucide-icon>
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-foreground">Glissez une image ici</p>
                    <p class="text-xs text-muted-foreground mt-0.5">
                      ou <span class="text-primary font-bold underline underline-offset-2">parcourir</span> depuis votre appareil
                    </p>
                  </div>
                  <p class="text-[10px] text-muted-foreground/60 font-medium">PNG, JPG, WEBP · max 5 Mo</p>
                </div>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                class="hidden"
                (change)="onFileSelected($event)"
              />
            </div>

            <!-- Preview (image loaded) -->
            <div *ngIf="previewUrl()" class="relative group rounded-2xl overflow-hidden border border-border shadow-sm" style="height: 176px;">
              <img
                [src]="previewUrl()"
                alt="Aperçu du produit"
                class="w-full h-full object-cover"
              />
              <!-- Hover overlay -->
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <label
                  for="image-upload-replace"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 text-black text-xs font-bold cursor-pointer hover:bg-white transition-colors"
                >
                  <lucide-icon [img]="Upload" class="w-3.5 h-3.5"></lucide-icon>
                  Remplacer
                </label>
                <button
                  type="button"
                  (click)="removeImage()"
                  class="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/90 text-white text-xs font-bold hover:bg-destructive transition-colors"
                >
                  <lucide-icon [img]="Trash2" class="w-3.5 h-3.5"></lucide-icon>
                  Supprimer
                </button>
              </div>
              <input
                id="image-upload-replace"
                type="file"
                accept="image/*"
                class="hidden"
                (change)="onFileSelected($event)"
              />
              <!-- File name badge -->
              <div class="absolute bottom-2 left-2 right-2">
                <span class="inline-block px-2.5 py-1 rounded-lg bg-black/60 text-white text-[10px] font-medium truncate max-w-full backdrop-blur-sm">
                  {{ selectedFileName() }}
                </span>
              </div>
            </div>
          </div>

          <!-- Nom du produit -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <lucide-icon [img]="Tag" class="w-3.5 h-3.5"></lucide-icon>
              Nom du produit <span class="text-destructive">*</span>
            </label>
            <input
              type="text"
              formControlName="nom"
              placeholder="Ex: Ordinateur portable HP EliteBook"
              class="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              [class.border-destructive]="form.get('nom')?.invalid && form.get('nom')?.touched"
            />
            <p *ngIf="form.get('nom')?.invalid && form.get('nom')?.touched" class="text-xs text-destructive font-medium">
              Le nom est requis.
            </p>
          </div>

          <!-- Description -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <lucide-icon [img]="FileText" class="w-3.5 h-3.5"></lucide-icon>
              Description
            </label>
            <textarea
              formControlName="description"
              rows="3"
              placeholder="Décrivez votre produit en quelques mots..."
              class="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm font-medium placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            ></textarea>
          </div>

          <!-- Prix + Catégorie -->
          <div class="grid grid-cols-2 gap-4">

            <!-- Prix -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <lucide-icon [img]="DollarSign" class="w-3.5 h-3.5"></lucide-icon>
                Prix <span class="text-destructive">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-bold select-none">€</span>
                <input
                  type="number"
                  formControlName="prixInitial"
                  placeholder="0.00"
                  min="0"
                  class="w-full h-11 pl-8 pr-4 rounded-xl border border-border bg-muted/30 text-sm font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  [class.border-destructive]="form.get('prixInitial')?.invalid && form.get('prixInitial')?.touched"
                />
              </div>
            </div>

            <!-- Catégorie SELECT -->
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <lucide-icon [img]="Layers" class="w-3.5 h-3.5"></lucide-icon>
                Catégorie <span class="text-destructive">*</span>
              </label>
              <div class="relative">
                <select
                  formControlName="idCategorie"
                  class="w-full h-11 px-4 pr-10 rounded-xl border border-border bg-muted/30 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none cursor-pointer"
                  [class.border-destructive]="form.get('idCategorie')?.invalid && form.get('idCategorie')?.touched"
                  [class.text-muted-foreground]="!form.get('idCategorie')?.value"
                >
                  <option value="" disabled class="text-muted-foreground">Sélectionner...</option>
                  <option
                    *ngFor="let cat of categories()"
                    [value]="cat._id"
                    class="bg-background text-foreground"
                  >
                    {{ cat.nom }}
                  </option>
                </select>
                <!-- Custom chevron -->
                <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
              <p *ngIf="form.get('idCategorie')?.invalid && form.get('idCategorie')?.touched" class="text-xs text-destructive font-medium">
                Veuillez sélectionner une catégorie.
              </p>
            </div>

          </div>

          <!-- ID Boutique -->
          <!-- <div class="space-y-2">
            <label class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <lucide-icon [img]="Store" class="w-3.5 h-3.5"></lucide-icon>
              ID Boutique
            </label>
            <input
              type="text"
              formControlName="idBoutique"
              placeholder="698dff42709de29d54628ca3"
              class="w-full h-11 px-4 rounded-xl border border-border bg-muted/30 text-sm font-mono text-xs placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div> -->

          <!-- Preview card -->
          <div
            *ngIf="form.get('nom')?.value || form.get('prixInitial')?.value"
            class="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4"
          >
            <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
              <img
                *ngIf="previewUrl()"
                [src]="previewUrl()"
                class="w-full h-full object-cover"
                alt="aperçu"
              />
              <div *ngIf="!previewUrl()" class="w-full h-full flex items-center justify-center">
                <lucide-icon [img]="Package" class="w-5 h-5 text-muted-foreground/50"></lucide-icon>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-bold text-sm truncate">{{ form.get('nom')?.value || '—' }}</p>
              <p class="text-xs text-muted-foreground">
                {{ getCategoryName((form.get('idCategorie')?.value || '')) || 'Catégorie non définie' }} ·
                <span class="font-bold text-primary">
                  {{ (form.get('prixInitial')?.value || 0) | currency:'EUR':'symbol':'1.2-2' }}
                </span>
              </p>
            </div>
          </div>

        </form>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between px-8 py-5 border-t border-border bg-muted/20">
        <p class="text-xs text-muted-foreground">
          <span class="text-destructive font-bold">*</span> Champs obligatoires
        </p>
        <div class="flex items-center gap-3">
          <button app-button variant="outline" (click)="close()" class="h-11 px-5 rounded-xl font-medium">
            Annuler
          </button>
          <button
            app-button
            (click)="confirm()"
            [disabled]="form.invalid"
            class="h-11 px-6 rounded-xl shadow-sm font-bold gap-2 disabled:opacity-40"
          >
            <lucide-icon [img]="CheckCircle2" class="w-4 h-4"></lucide-icon>
            {{ isEdit() ? 'Enregistrer les modifications' : 'Créer le produit' }}
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 2px; }
  `]
})
export class CreationDialogueComponent {

  private dialogRef = inject(MatDialogRef<CreationDialogueComponent>);
  private data = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private categorieService = inject(CategorieService);
  private backendLink = Environments.BACKEND || 'http://localhost:3000';

  readonly Package = Package;
  readonly Tag = Tag;
  readonly Store = Store;
  readonly Layers = Layers;
  readonly DollarSign = DollarSign;
  readonly FileText = FileText;
  readonly CheckCircle2 = CheckCircle2;
  readonly ImagePlus = ImagePlus;
  readonly Trash2 = Trash2;
  readonly Upload = Upload;
  readonly X = X;

  isEdit = signal(false);
  previewUrl = signal<string | null>(null);
  selectedFileName = signal<string>('');
  selectedFile = signal<File | null>(null);
  isDragging = signal(false);

  // Remplacez ce signal par votre CategorieService :
  // categorieService = inject(CategorieService);
  // categories = this.categorieService.categories;
  categories = signal<Categorie[]>([
    { _id: '698dfde1709de29d54628ca2', nom: 'Informatique' },
    { _id: '698dfde1709de29d54628ca3', nom: 'Électronique' },
    { _id: '698dfde1709de29d54628ca4', nom: 'Vêtements' },
    { _id: '698dfde1709de29d54628ca5', nom: 'Maison & Déco' },
    { _id: '698dfde1709de29d54628ca6', nom: 'Sport' },
  ]);

  form = this.fb.group({
    nom: ['', Validators.required],
    description: [''],
    prixInitial: [0, [Validators.required, Validators.min(0)]],
    idCategorie: ['', Validators.required],
    idBoutique: ['']
  });

  constructor() {
    this.initCategories();
    if (this.data) {
      this.isEdit.set(true);
     
      this.form.patchValue({
        nom: this.data.nom,
        description: this.data.description,
        prixInitial: this.data.prixInitial,
        idCategorie: this.data.idCategorie?._id ?? this.data.idCategorie,
        idBoutique: this.data.idBoutique?._id ?? this.data.idBoutique
      });
      if (this.data.image) {
        this.previewUrl.set(this.backendLink+'/'+this.data.image);
        this.selectedFileName.set('Image existante');
      }
    }
  }
  async initCategories() {
    this.categories.set(await this.categorieService.getCategories());
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      this.loadFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file?.type.startsWith('image/')) {
      this.loadFile(file);
    }
  }

  private loadFile(file: File) {
    this.selectedFile.set(file);
    this.selectedFileName.set(file.name);
    const reader = new FileReader();
    reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.previewUrl.set(null);
    this.selectedFile.set(null);
    this.selectedFileName.set('');
  }

  getCategoryName(id: string): string {
    return this.categories().find(c => c._id === id)?.nom || '—';
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.form.value,
        imageFile: this.selectedFile(),
        imagePreview: this.previewUrl()
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}