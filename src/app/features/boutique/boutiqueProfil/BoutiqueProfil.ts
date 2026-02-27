import {Component, OnInit} from "@angular/core";
import { CardComponent, CardContentComponent, CardHeaderComponent } from "../../../components/ui/card";
import { CommonModule } from "@angular/common";
import {ArrowRight, Camera, LucideAngularModule, MessageSquare, SquarePenIcon, User} from "lucide-angular";
import { BadgeComponent } from "../../../components/ui/badge";
import { ClientReviewsComponent } from "../../client/clientReviews/ClientReviews";
import { InputComponent } from "../../../components/ui/input";
import { ButtonComponent } from "../../../components/ui/button";
import {DetailBoutiqueService} from '../../../services/detailBoutiqueService/detail-boutique-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DetailBoutique} from '../../../model/detailBoutiqueModel';


@Component({
  selector: 'app-boutique-profil',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    CardHeaderComponent,
    CardHeaderComponent,
    LucideAngularModule,
    ClientReviewsComponent,
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './BoutiqueProfil.html',
})
export class BoutiqueProfilComponent implements OnInit {

  form!: FormGroup;
  detailBoutique: DetailBoutique | null = null;
  isEditMode = false;
  showToast: boolean = false;
  toastMessage: string = '';

  userId = "698dfddc709de29d54628ca5";
  boutiqueExistante: boolean = false;

  constructor(
    private fb: FormBuilder,
    private detailBoutiqueService: DetailBoutiqueService
  ) {}

  async ngOnInit() {
    this.initForm();
    await this.loadDetailBoutique();
  }

  private initForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      descriptionDetail: [''],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      descriptionHoraire: ['', Validators.required],
      image: ['']
    });
  }

  triggerToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  async loadDetailBoutique() {
    try {
      const response = await this.detailBoutiqueService.getDetailBoutiqueByUserId(this.userId);
      if (!response) {
        this.detailBoutique = null;
        this.boutiqueExistante = false;
        return;
      }
      const detail = Array.isArray(response) ? response[0] : response;
      this.detailBoutique = detail as DetailBoutique;
      this.boutiqueExistante = true;

    } catch (err) {
      console.error('Erreur lors du chargement :', err);
      this.detailBoutique = null;
      this.boutiqueExistante = false;
    }
  }

  enableEdit() {
    this.isEditMode = true;
    if (!this.detailBoutique) return;

    this.form.patchValue({
      nom: this.detailBoutique.idBoutique?.nom,
      email: this.detailBoutique.email,
      descriptionDetail: this.detailBoutique.description,
      adresse: this.detailBoutique.adresse,
      telephone: this.detailBoutique.telephone,
      descriptionHoraire: this.detailBoutique.descriptionHoraire,
      image: this.detailBoutique.image
    });
  }

  async saveBoutique() {
    if (this.form.invalid) return;
    try {
      if (!this.boutiqueExistante) {
        await this.addDetailBoutique();
        this.triggerToast('Boutique créée avec succès !');
      } else {
        await this.updateBoutique();
        this.triggerToast('Profil mis à jour !');
      }
      this.isEditMode = false;
      await this.loadDetailBoutique();
    } catch (err) {
      console.error(err);
      this.triggerToast("Erreur lors de l'enregistrement.");
    }
  }

  async addDetailBoutique() {
    const payload = {
      boutique: {
        nom: this.form.value.nom,
        description: "description par defaut",
        idUser: this.userId,
        idCategorie: "69903afccefeb3862e628ca6"
      },
      detail: {
        description: this.form.value.descriptionDetail,
        email: this.form.value.email,
        adresse: this.form.value.adresse,
        telephone: this.form.value.telephone,
        descriptionHoraire: this.form.value.descriptionHoraire,
        noteMoyen: 0,
        image: this.form.value.image,
        status: 1
      }
    };
    await this.detailBoutiqueService.addDetail(payload);
  }

  async updateBoutique() {
    const payload = {
      boutique: {
        nom: this.form.value.nom
      },
      detail: {
        description: this.form.value.descriptionDetail,
        email: this.form.value.email,
        adresse: this.form.value.adresse,
        telephone: this.form.value.telephone,
        descriptionHoraire: this.form.value.descriptionHoraire,
        noteMoyen: 0,
        image: this.form.value.image
      }
    };
    await this.detailBoutiqueService.updateDetail(this.userId, payload);
  }

  readonly icons = { User, MessageSquare, Camera, SquarePenIcon };
}
