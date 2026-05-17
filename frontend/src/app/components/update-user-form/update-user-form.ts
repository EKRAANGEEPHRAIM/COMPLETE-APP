import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { lucideLoaderCircle } from '@ng-icons/lucide';
import { AuthStore } from '../../store/auth.store';
import { validateWithZod } from '../../utils/validate-with-zod';
import { UpdateUserFormData, updateUserSchema } from '../../schema/Auth.schema';
import { HlmButton } from '../../shared/ui/button/src/index';
import { HlmInput } from '../../shared/ui/input/src/index';
import { NgIcon } from "@ng-icons/core";

@Component({
  selector: 'app-update-user-form',
  imports: [HlmInput, ɵInternalFormsSharedModule, HlmButton, NgIcon ,ReactiveFormsModule],
  templateUrl: './update-user-form.html',
  styleUrl: './update-user-form.css',
})
export class UpdateUserForm {
   // ICONS
  readonly LoaderIcon =
    lucideLoaderCircle;

  // INJECT
  private fb =
    inject(FormBuilder);

  readonly authStore =
    inject(AuthStore);

  // SIGNALS
  error =
    signal<string | null>(null);

  success =
    signal<string | null>(null);

  errors:
    Record<string, string[]> = {};

  // FORM
  form = this.fb.group({
    name: [''],
    email: [''],
  });

  constructor() {

    effect(() => {

      const user =
        this.authStore.user();

      if (user) {

        this.form.patchValue({
          name: user.name,
          email: user.email,
        });

      }

    });
  }

  // SUBMIT
  async submit() {

    const user =
      this.authStore.user();

    if (!user) return;

    this.error.set(null);
    this.success.set(null);

    // VALIDATION
    const validation =
      validateWithZod(
        updateUserSchema,
        this.form.getRawValue()
      );

    if (!validation.success || !validation.data) {

      this.errors =
        validation.errors as Record<string, string[]>;

      return;
    }

    this.errors = {};

    const data =
      validation.data;

    const updateData:
      UpdateUserFormData = {};

    // CHECK CHANGES
    if (
      data.name &&
      data.name !== user.name
    ) {

      updateData.name =
        data.name;

    }

    if (
      data.email &&
      data.email !== user.email
    ) {

      updateData.email =
        data.email;

    }

    // NO CHANGES
    if (
      Object.keys(updateData)
        .length === 0
    ) {

      this.error.set(
        'No changes detected'
      );

      return;
    }

    try {

      await this.authStore
        .updateUser(updateData);

      this.success.set(
        'Profile updated successfully!'
      );

    } catch (err) {

      this.error.set(
        err instanceof Error
          ? err.message
          : 'An error occurred'
      );

    }
  }




}
