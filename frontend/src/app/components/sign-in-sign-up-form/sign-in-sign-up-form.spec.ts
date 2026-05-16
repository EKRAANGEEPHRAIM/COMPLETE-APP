import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSignUpForm } from './sign-in-sign-up-form';

describe('SignInSignUpForm', () => {
  let component: SignInSignUpForm;
  let fixture: ComponentFixture<SignInSignUpForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInSignUpForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInSignUpForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
