import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Eye, EyeOff, ArrowRight, ArrowLeft,
  Sparkles, Lock, Mail, Store, User,
  ShoppingBag, Check, Phone, ChevronRight,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, ButtonComponent],
  templateUrl: './inscription.html',
})
export class RegisterClientComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly ArrowRight = ArrowRight;
  readonly ArrowLeft = ArrowLeft;
  readonly Sparkles = Sparkles;
  readonly Lock = Lock;
  readonly Mail = Mail;
  readonly Store = Store;
  readonly User = User;
  readonly ShoppingBag = ShoppingBag;
  readonly Check = Check;
  readonly Phone = Phone;
  readonly ChevronRight = ChevronRight;

  // ── Stepper ──
  currentStep = signal(1);
  readonly TOTAL_STEPS = 3;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  progress = computed(() => (this.currentStep() / this.TOTAL_STEPS) * 100);

  steps = [
    { number: 1, label: 'Identifiants' },
    { number: 2, label: 'Informations' },
    { number: 3, label: 'Confirmation' },
  ];

  // ── Étape 1 : Email + mot de passe ──
  step1 = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatchValidator });

  // ── Étape 2 : Infos personnelles ──
  step2 = this.fb.group({
    prenom: ['', [Validators.required, Validators.minLength(2)]],
    nom: ['', [Validators.required, Validators.minLength(2)]],
    telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\s\-]{8,15}$/)]],
    acceptTerms: [false, Validators.requiredTrue],
  });

  // ── Force du mot de passe ──
  passwordStrength = computed(() => {
    const pwd = this.step1.get('password')?.value ?? '';
    if (!pwd) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 1) return { level: 1, label: 'Faible', color: 'bg-destructive' };
    if (score === 2) return { level: 2, label: 'Moyen', color: 'bg-amber-500' };
    if (score === 3) return { level: 3, label: 'Bon', color: 'bg-blue-500' };
    return { level: 4, label: 'Excellent', color: 'bg-emerald-500' };
  });

  strengthBars = [0, 1, 2, 3];

  // ── Navigation ──
  nextStep() {
    if (this.currentStep() === 1) {
      this.step1.markAllAsTouched();
      if (this.step1.invalid) return;
    }
    if (this.currentStep() === 2) {
      this.step2.markAllAsTouched();
      if (this.step2.invalid) return;
    }
    if (this.currentStep() < this.TOTAL_STEPS) {
      this.currentStep.update(s => s + 1);
      this.errorMessage.set('');
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      this.errorMessage.set('');
    }
  }

  // ── Helpers ──
  hasError(form: 'step1' | 'step2', field: string, error = ''): boolean {
    const ctrl = (form === 'step1' ? this.step1.get(field) : this.step2.get(field));
    if (!ctrl?.touched || !ctrl?.invalid) return false;
    return error ? ctrl.hasError(error) : ctrl.invalid;
  }

  hasFormError(error: string): boolean {
    return !!(this.step1.touched && this.step1.hasError(error));
  }

  getValue(form: 'step1' | 'step2', field: string): any {
    return (form === 'step1' ? this.step1.get(field) : this.step2.get(field))?.value;
  }

  toggleCheckbox(field: string) {
    const ctrl = this.step2.get(field);
    ctrl?.setValue(!ctrl.value);
    ctrl?.markAsTouched();
  }

  // ── Submit ──
  async onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    try {
      const payload = {
        email: this.step1.value.email,
        password: this.step1.value.password,
        prenom: this.step2.value.prenom,
        nom: this.step2.value.nom,
        telephone: this.step2.value.telephone,
        role: 'client',
      };
      // await this.authService.register(payload);
      await new Promise(r => setTimeout(r, 1200)); // ← remplacer par authService
      this.router.navigate(['/login'], { queryParams: { registered: true } });
    } catch (err: any) {
      this.errorMessage.set(err?.message ?? 'Une erreur est survenue. Veuillez réessayer.');
      this.currentStep.set(1);
    } finally {
      this.isLoading.set(false);
    }
  }

  // ── Panel gauche ──
  perks = [
    { icon: '🛍️', title: 'Des milliers de produits', desc: 'Explorez le catalogue de boutiques locales' },
    { icon: '⚡', title: 'Commandes rapides', desc: 'Ajoutez au panier et commandez en quelques clics' },
    { icon: '🔒', title: 'Compte sécurisé', desc: 'Vos données sont protégées et chiffrées' },
    { icon: '📦', title: 'Suivi en temps réel', desc: 'Suivez chaque étape de vos livraisons' },
  ];

  featuredImages = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
    'https://images.unsplash.com/photo-1581557991964-125469da3b8a?w=300&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&q=80',
  ];
}