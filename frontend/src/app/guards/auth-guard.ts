import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router)
  
  if(!auth.token()){
    router.navigate(['/home']);
    return false;
  }
  
  return true;
};
