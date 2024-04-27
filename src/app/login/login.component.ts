import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formulario!: FormGroup;
  returnUrl!: string;
  error = '';
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService,
  ) {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logar() {
    this.submitted = true;
    this.loading = true;

    if (this.formulario.invalid) {
      this.loading = false;
      return;
    }

    const user: User = {
      username: this.form().username,
      password: this.form().password,
    };

    this.service.logar(user).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos';
        this.loading = false;
      },
    });
  }

  form() {
    return this.formulario.value;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  get username() {
    return this.formulario.get('username');
  }

  get password() {
    return this.formulario.get('password');
  }
}
