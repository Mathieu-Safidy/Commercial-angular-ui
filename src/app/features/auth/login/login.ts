import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Eye,
  EyeOff,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  Store,
  User,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { AuthServices } from '../../../services/authService/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ButtonComponent,
  ],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthServices);

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly ShoppingBag = ShoppingBag;
  readonly ArrowRight = ArrowRight;
  readonly Sparkles = Sparkles;
  readonly Lock = Lock;
  readonly Mail = Mail;
  readonly Store = Store;
  readonly User = User;

  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  typeActive = signal([
    { label: 'Client', value: 'User', icon: User, active: true },
    { label: 'Boutique', value: 'Boutique', icon: Store, active: false },
    { label: 'Admin', value: 'Admin', icon: User, active: false }
  ]);
  activeLoginType = signal('User');

  active = {
    conteneur: 'flex flex-col items-center gap-2 p-4 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group text-center',
    icone: 'w-5 h-5 text-primary transition-colors',
    text: 'text-xs font-bold text-primary'
  }

  inactive = {
    conteneur: 'flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-all cursor-pointer group text-center',
    icone: 'w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors',
    text: 'text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors'
  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  activeLogin(type: string) {
    this.activeLoginType.set(type);
    this.typeActive.update((types) => {
      return types.map(t => ({
        ...t,
        active: t.value === type ? true : false
      }));
    });
  }

  // Données visuelles du panneau gauche
  stats = [
    { value: '12K+', label: 'Produits disponibles' },
    { value: '340+', label: 'Boutiques actives' },
    { value: '98%', label: 'Clients satisfaits' },
  ];

  featuredImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    'https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=200&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
  ];

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      // Remplacez par votre service d'authentification
      // await this.authService.login(this.form.value.email, this.form.value.password);
      let payload = {
        email: this.form.value.email!,
        password: this.form.value.password!
      }
      await this.authService.login(payload.email, payload.password, this.activeLoginType());
      const user = this.authService.currentUserSubject.value;
      // await new Promise(r => setTimeout(r, 1000)); // simulation
      const roleRedirectMap: Record<string, string> = {
        Admin: '/acceuil/admin',
        Boutique: '/acceuil/boutique',
        User: '/acceuil/client'
      };

      const redirectPath = roleRedirectMap[user?.role ?? ''] || '/acceuil';

      this.router.navigate([redirectPath]);
    } catch (err: any) {
      this.errorMessage.set(err?.message ?? 'Email ou mot de passe incorrect.');
    } finally {
      this.isLoading.set(false);
    }
  }

  hasError(field: string, error: string = ''): boolean {
    const ctrl = this.form.get(field);
    if (!ctrl?.touched || !ctrl?.invalid) return false;
    return error ? ctrl.hasError(error) : ctrl.invalid;
  }
}