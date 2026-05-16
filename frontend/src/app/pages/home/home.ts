import { Component, effect, inject } from '@angular/core';
import { AuthStore } from '../../store/auth.store';
import { Router } from '@angular/router';
import { SignInSignUpForm } from '../../components/sign-in-sign-up-form/sign-in-sign-up-form';

@Component({
  selector: 'app-home',
  imports: [SignInSignUpForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private authStore = inject(AuthStore);
  private router = inject(Router)


  constructor() {
    effect(() => {
      const token = this.authStore.token();
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    })
  }

  get token() {
    return this.authStore.token();
  }
}
