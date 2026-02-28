import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../services/userService/user-service';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './adminUser.html',
  styleUrls: ['./adminUser.scss'],
})
export class AdminUserComponent {

  form: FormGroup;
  loading = false;
  showPwd = false;
  
  allUser = signal<any[]>([]) ;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      idProfil: ['', Validators.required],
    });
  }

  // Accès plus sûr aux contrôles
  get f() {
    return this.form.controls as {
      username: any;
      email: any;
      password: any;
      idProfil: any;
    };
  }

  async ngOnInit() {
    this.loadUsers() ;
  }
  async loadUsers() {
    this.allUser.set( await this.userService.getAllUsers() as any[] ) ;
    console.log(this.allUser()) ;
  } 

  selectProfil(id: string): void {
    this.form.patchValue({ idProfil: id });
    this.f.idProfil.markAsTouched(); // plus simple que get(...)
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = {
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
      idProfil: this.f.idProfil.value,
    };
    this.userService.createUser(payload) ;
    this.loading = true;
  }
   profils = [
    { _id: '1', name: 'Admin' },
    { _id: '2', name: 'Boutique' }
  ];
}