import { Component, effect, inject } from '@angular/core';
import { lucideLoaderCircle, lucidePencil } from '@ng-icons/lucide';

import { Router } from '@angular/router';
import { AuthStore } from '../../store/auth.store';
import { NgIcon } from "@ng-icons/core";
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmCard, HlmCardTitle, HlmCardContent } from "@spartan-ng/helm/card";
import { UpdateUserForm } from '../update-user-form/update-user-form';

@Component({
  selector: 'app-dashboard',
  imports: [NgIcon, HlmButton, HlmCard, HlmCardTitle, HlmCardContent, UpdateUserForm],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  //ICONS

  readonly LoaderIcon = lucideLoaderCircle;
  readonly PencilIcon = lucidePencil;


  //INJECT
  readonly authStore = inject(AuthStore);
  private router = inject(Router);


  constructor(){
    
    // effect allows us to run code when a signal changes
    effect(()=>{
    const token = this.authStore.token();
    if(!token){
      this.router.navigate(['/']);

    }
    })
  }


  //LOGOUt

  logout(){
    this.authStore.logout();

    this.router.navigate([
      '/'
    ])
  }
}
