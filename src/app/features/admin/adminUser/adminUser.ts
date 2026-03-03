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
import { ButtonComponent } from "../../../components/ui/button";

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
    ButtonComponent
],
  templateUrl: './adminUser.html',
  styleUrls: ['./adminUser.scss'],
})
export class AdminUserComponent {

  form: FormGroup;
  loading = false;
  showPwd = false;
  
  allUser = signal<any[]>([]) ;

  profils = [
    { _id: '1', name: 'Admin' },
    { _id: '2', name: 'Boutique' }
  ];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      idProfil: ['', Validators.required],
    });
  }
  

  async deleteUser(idUser : string ) { 
     await this.userService.deleteUser( idUser) ; 
      this.allUser.update(users =>
        users.filter(u => u._id !== idUser)
      );
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

  async onSubmit() {
  if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload = {
      username: this.f.username.value,
      email: this.f.email.value,
      password: this.f.password.value,
      idProfil: this.f.idProfil.value,
    };
    console.log("Payload ::: " , payload) ;

    try {
      await this.userService.createUser(payload);
      await this.loadUsers();
      this.form.reset();
      this.form.markAsUntouched();

    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
  }