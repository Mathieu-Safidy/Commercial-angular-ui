import { Component } from "@angular/core";
import { CardComponent, CardContentComponent, CardHeaderComponent } from "../../../components/ui/card";
import { CommonModule } from "@angular/common";
import { Camera, LucideAngularModule, MessageSquare, SquarePenIcon, User } from "lucide-angular";
import { BadgeComponent } from "../../../components/ui/badge";
import { ClientReviewsComponent } from "../../client/clientReviews/ClientReviews";
import { InputComponent } from "../../../components/ui/input";
import { ButtonComponent } from "../../../components/ui/button";

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
    BadgeComponent,
    ClientReviewsComponent,
    InputComponent,
    ButtonComponent
],
  templateUrl: './BoutiqueProfil.html',
})
export class BoutiqueProfilComponent {
    readonly icons = { User, MessageSquare, Camera, SquarePenIcon}
}