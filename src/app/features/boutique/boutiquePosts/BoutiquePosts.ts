import { Component, inject, signal } from '@angular/core';
import { CardComponent, CardContentComponent } from '../../../components/ui/card';
import { NgClass, NgForOf } from '@angular/common';
import { BadgeComponent } from '../../../components/ui/badge';
import {
  Calendar,
  CircleCheck,
  Clock,
  Forward,
  LucideAngularModule,
  MessageSquareMore,
  Package,
  ShoppingBag,
  ThumbsUp,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { InputComponent } from '../../../components/ui/input';
import { NewPostDialogComponent, NewPostResult } from '../../../components/ui/newPost/newPostDialogue';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../../../services/postService/post-service';
import { Utils } from '../../../services/utils/utils';
import { Environments } from '../../../environements/environments';
import { ImagePreviewDialogComponent } from '../../../components/ui/imagePreview/imagePreview';
import { BoutiqueService } from '../../../services/boutiqueService/boutique-service';
import { AuthServices } from '../../../services/authService/auth.services';
import { RoleDirective } from '../../../directives/roleDirective/role-directive';

type OrderStatus = 'Nouveau' | 'En préparation' | 'Prêt à envoyer' | 'Expédié';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: string;
  status: OrderStatus;
  time: string;
  text?: string;
  image?: string[];
}
@Component({
  selector: 'app-boutique-posts',
  standalone: true,
  templateUrl: './BoutiquePosts.html',
  imports: [
    CardComponent,
    CardContentComponent,
    NgClass,
    //BadgeComponent,
    // NgForOf,
    // InputComponent,
    ButtonComponent,
    LucideAngularModule,
    RoleDirective,
  ],
})
export class BoutiquePostsComponent {
  readonly Calendar = Calendar;
  readonly Package = Package;
  readonly ShoppingBag = ShoppingBag;
  readonly CircleCheck = CircleCheck;
  readonly Clock = Clock;
  readonly ThumbsUp = ThumbsUp;
  readonly MessageSquareMore = MessageSquareMore;
  readonly Forward = Forward;
  backenUrl = Environments.BACKEND;
  dialog = inject(MatDialog);
  postService = inject(PostService);
  authService = inject(AuthServices);

  boutiqueService = inject(BoutiqueService);

  orders = signal<Order[]>([
    {
      id: 'Jean Peaul',
      customer: 'Sophie Martin',
      items: 3,
      total: '159€',
      status: 'Nouveau',
      time: '12 min ago',
      text: 'Découvrez notre nouvelle collection printemps-été avec des pièces légères et colorées pour un style frais et tendance !',
      image: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800&h=400',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800&h=400',
      ],
    },
    {
      id: '#ORD-9820',
      customer: 'Jean Dupont',
      items: 1,
      total: '45€',
      status: 'En préparation',
      time: '45 min ago',
    },
    {
      id: '#ORD-9818',
      customer: 'Emma Bernard',
      items: 2,
      total: '85€',
      status: 'Prêt à envoyer',
      time: '2 hours ago',
    },
    {
      id: '#ORD-9815',
      customer: 'Lucas Petit',
      items: 5,
      total: '340€',
      status: 'Expédié',
      time: '5 hours ago',
    },
  ]);

  ngOnInit() {
    this.initPost();
  }

  async initPost() {
    let user = this.authService.currentUserSubject.value;

    let posts = await this.postService.getPostByRole(user?._id || '');

    
  this.orders.set(
    await Promise.all(posts.map(async (post: any) => {
    const created = new Date(post.createdAt);
    const diff = Date.now() - created.getTime();
    // const customerName = (await this.definirNomPost(post.idUser._id, post.idUser.idProfil.nom))?.nom || post.idUser;

        return {
          id: post._id,
          customer: post.nom,
          items: post.images.length,
          total: ``,
          status: 'Nouveau',
          time:
            diff < 60000
              ? "À l'instant"
              : created.toLocaleString('fr-FR', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                }),
          text: post.description,
          image: post.images.map((img: any) => this.backenUrl + '/' + img.link),
        };
      }))
    );
  }

  openNewPostDialog() {
    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'rounded-dialog', // voir styles globaux ci-dessous
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe( async (result: NewPostResult | undefined) => {
      if (!result) return;

      const newPost = {
        id: Date.now(),
        customer: 'Moi', // remplacer par l'utilisateur connecté
        time: new Date().toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }),
        text: result.text,
        image: result.imagePreviews,
        images: result.images
        // Appelez ici votre service pour persister le post si besoin
      };

      let postcreated = await this.postService.createPost({ text: result.text, imageFiles: result.images })
      const created = new Date(postcreated.createdAt);
      const diff = Date.now() - created.getTime();
      let user = this.authService.currentUserSubject.value;
      const postername = (await this.definirNomPost(user?._id || '', user?.role || ''))?.nom || postcreated.idUser;


      let postWithModel: Order = {
        id: postcreated._id,
        customer: postername as string,
        items: postcreated.images.length,
        total: ``,
        status: 'Nouveau' as OrderStatus,
        time: diff < 60000
              ? "À l'instant"
              : created.toLocaleString('fr-FR', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                }),
        text: postcreated.description,
        image: postcreated.images.map((img: any) => this.backenUrl + '/' + img.link),
      }
      
      this.orders.update((orders) => [postWithModel, ...orders]);
      // this.orders.unshift(newPost as any);
    });
  }

async definirNomPost(userId: string, profil: string) {
  if (profil === 'Boutique') {
    return await this.boutiqueService.getBoutiqueByUserId(userId) 
  } else {
    return { nom: userId };
  }
  // if (profil === 'Admin') return 'Admin';
  // if (profil === 'Boutique') return 'Boutique';
}

openPreview(imageUrl: string): void {
  this.dialog.open(ImagePreviewDialogComponent, {
     data: { imageUrl },
  width: 'auto',
  height: 'auto',
  maxWidth: '95vw',
  maxHeight: '95vh',
  panelClass: 'image-preview-dialog',
  });
}

  getStatusBarClass(status: OrderStatus): string {
    switch (status) {
      case 'Nouveau':
        return 'bg-primary';
      case 'En préparation':
        return 'bg-amber-500';
      case 'Expédié':
        return 'bg-emerald-500';
      default:
        return 'bg-blue-500';
    }
  }

  getStatusBadgeClass(status: OrderStatus): string {
    switch (status) {
      case 'Nouveau':
        return 'bg-primary text-white shadow-glow';
      case 'En préparation':
        return 'bg-amber-500/10 text-amber-500';
      case 'Expédié':
        return 'bg-emerald-500/10 text-emerald-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  }
}
