import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { lucideLoaderCircle, lucideLock, lucideMail, lucideUser } from '@ng-icons/lucide';
import { NgIconComponent } from '@ng-icons/core';
import { AuthStore } from '../../store/auth.store';
import { Router } from '@angular/router';
import { LoginFormData, loginSchema, RegisterFormData, registerSchema } from '../../schema/Auth.schema';
import { validateWithZod } from '../../utils/validate-with-zod';
import { HlmCardTitle, HlmCardDescription, HlmCardHeader, HlmCardContent } from '../../shared/ui/card/src/index';
import { HlmButton } from '../../shared/ui/button/src/index';
import { HlmInput } from '../../shared/ui/input/src/index';

@Component({
  selector: 'app-sign-in-sign-up-form',
  imports: [ReactiveFormsModule,
    NgIconComponent,
    HlmCardTitle, 
    HlmCardDescription, 
    HlmCardHeader, 
    HlmCardContent, 
    HlmButton, 
    HlmInput,
    ],
  templateUrl: './sign-in-sign-up-form.html',
  styleUrl: './sign-in-sign-up-form.css',
})
export class SignInSignUpForm {
 

  // ICONS
 readonly MailIcon = lucideMail
 readonly LockIcon = lucideLock
 readonly UserIcon = lucideUser;
 readonly LoaderIcon = lucideLoaderCircle;


 //INJECT
private fb = inject(FormBuilder)

readonly authStore = inject(AuthStore) 

private router = inject(Router)



//SIGNALS
isLogin = signal(true)

errors : Record<string, string[]> = {}

//Form

form = this.fb.group({
  name : [''],
  email : [''],
  password : ['']
})


//COMPUTED


readonly title = computed(() => this.isLogin() ? 'Sign In' : 'Sign Up')


readonly description = computed(() => this.isLogin() ? 'Welcome back! Please enter your details.' : 'Create a new account to get started.')


constructor()  {

  // effect allows 
  effect(() => {
    // 
    const token = this.authStore.token()

    if(token) {
      this.router.navigate(['/dashboard'])
    }
  })
}



//SUBMIt

async submit() {
  // schema allows
  const schema = this.isLogin() ? loginSchema : registerSchema;

  // validate form
  const validation = validateWithZod(schema , this.form.getRawValue())

  if(!validation.success) {
    this.errors = validation.errors as Record<string, string[]>;
    return;
  }

  this.errors = {};

  try {
    if(this.isLogin()){
      await this.authStore.login(this.form.value as LoginFormData)
    }

    else {
      await this.authStore.register(this.form.value as RegisterFormData)
    }
  } catch{
    
  }
}



//TOGGLE

toggleMode() {
  this.isLogin.update(value => !value);

  this.authStore.clearError();


  this.errors = {};


  this.form.reset({
    name : '',
    email : '',
    password : '',
  })
}
} 
