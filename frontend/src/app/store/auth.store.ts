import {  patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthState, User } from "../Models/authModel";
import { computed, inject } from '@angular/core';
import { AuthService } from '../Services/auth';
import { Router } from '@angular/router';
import { LoginFormData, RegisterFormData, UpdateUserFormData } from '../schema/Auth.schema';
import { firstValueFrom } from 'rxjs';


// Initial state for the auth store
const initialState : AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null
};


export const AuthStore = signalStore(
    // providedIn: 'root' makes the store available globally
    // protectedState: true makes the state private and only accessible through the store
    { providedIn: 'root', protectedState: true },
    
    // withstate allows us to define the initial state of the store
    withState(initialState),

    // withComputed allows us to define computed properties
    withComputed((store) => ({
        isAuthenticated: () => !!store.token(),
        userName : computed(() => store.user()?.name ?? ''),
        userRole: computed(() => store.user()?.role ?? 'USER')
    })),

    // withMethods allows us to define methods that can modify the state
    withMethods((store , authservice = inject(AuthService)) => ({

        // login method
        async login(credentials : LoginFormData) : Promise<void> {
            patchState(store , {isLoading : true , error : null});
            
            try {
                // Call the login API
              const result = await firstValueFrom(authservice.login(credentials));
              
              // Store the token in localStorage
              localStorage.setItem('token' , result.accessToken);

              // Update the store with the user data
              patchState(store , {
                user : result.user,
                token : result.accessToken,
                isLoading : false
              });
            } catch (err : any) {
               patchState(store, {
                error : err?.message || 'Login failed',
                isLoading : false,
               });

               throw err;
            }
        }

        

        // register method
        , async register(data : RegisterFormData){
            // Set loading state and clear any previous errors
            patchState(store , {isLoading : true , error : null});

            
            try {
                
                const response = await firstValueFrom(authservice.register(data))
                
                // Store the token in localStorage
                localStorage.setItem('token' , response.accessToken);

                patchState(store , {
                    user : response.user,
                    token : response.accessToken,
                    isLoading : false
                });
            } catch (err : any) {
                
                patchState(store , {
                    error : err?.message || 'Registration failed',
                    isLoading : false
                });
                throw err;
            }
        },

        //logout
        logout() {
            localStorage.removeItem('token');
            patchState(store , {
                user : null,
                token : null,
                error : null,
            });
        },

        //UPDATE USER
        async updateUser(data : UpdateUserFormData) {
            // Get the current user from the store
            const user = store.user()
            

            if(!user) return;

            patchState(store , {
                isLoading :true,
                error : null,
            });

           try {
            // Call the API to update the user
            const updateUser = await firstValueFrom(authservice.updateUser(user.id , data))

            // Update the store with the updated user data
            patchState(store , {
                user : updateUser,
                isLoading : false
            });

           } catch (err : any) {
            patchState(store , {
                error : err?.message || 'Update failed',
                isLoading : false
            });
            throw err;
           }
        },

        //GET PROFILE

        async getProfile() {
           
            
            patchState(store , {
                isLoading : true,
                error : null,
            });

            try {
                //  get the user profile
                const user = await firstValueFrom(authservice.getProfile());
                // Update the store with the user data
                patchState(store , {
                    user : user,
                    isLoading : false,
                });
            } catch (err : any) {
                patchState(store , {
                    error : err?.message || 'Failed to get profile',
                    isLoading : false,
                });
                throw err;
            }
        },


        // CLEAR ERROR
        clearError() {
            patchState(store , {
                error : null,
            });
        },

        // set user

        setUSer(user : User) {
            patchState(store , {
                user : user,
            });
        }
    }))

)
