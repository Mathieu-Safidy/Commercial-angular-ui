import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  ShieldX, Home, ArrowLeft, LogIn, Lock,
} from 'lucide-angular';
import { ButtonComponent } from '../../../components/ui/button';
import { AuthServices } from '../../../services/authService/auth.services';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  templateUrl: './acces-denied.html',
})
export class AccessDeniedComponent implements OnInit, OnDestroy {
  private router = inject(Router);
    private authService = inject(AuthServices);
  readonly ShieldX = ShieldX;
  readonly Home = Home;
  readonly ArrowLeft = ArrowLeft;
  readonly LogIn = LogIn;
  readonly Lock = Lock;

  countdown = signal(10);
  private timer: any;


  ngOnInit() {
    this.timer = setInterval(() => {
      this.countdown.update(c => {
        if (c <= 1) {
          clearInterval(this.timer);
          const user = this.authService.currentUserSubject.value;
          if (!user) {
            this.router.navigate(['/login']);
            return 0;
          } else if (user.role === 'Admin') {
            this.router.navigate(['/acceuil/admin']);
            return 0;
          } else if (user.role === 'Boutique') {
            this.router.navigate(['/acceuil/boutique']);
            return 0;
          } else if (user.role === 'User') {
            this.router.navigate(['/acceuil/client']);
            return 0;
          }
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  goBack() {
    clearInterval(this.timer);
    window.history.back();
  }

  goHome() {
    clearInterval(this.timer);
    this.router.navigate(['/']);
  }

  goLogin() {
    clearInterval(this.timer);
    this.router.navigate(['/login']);
  }

  progressWidth = () => `${(this.countdown() / 10) * 100}%`;
}