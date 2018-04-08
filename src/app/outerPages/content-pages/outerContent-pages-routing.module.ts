import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { SignupComponent } from './signup/signup.component';
import { ActivationComponent } from './activation/activation.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ConfirmComponent } from './mojoConfirm/confirm.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page',
        },
      },
      {
        path: 'updatepassword/:id',
        component: UpdatePasswordComponent,
        data: {
          title: 'update Password Page',
        },
      },
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page',
        },
      },
      {
        path: 'signup',
        component: SignupComponent,
        data: {
          title: 'Signup Page',
        },
      },
      {
        path: 'activation/:id',
        component: ActivationComponent,
        data: {
          title: 'activation Page',
        },
      },
      {
        path: 'mojo',
        component: ConfirmComponent,
        data: {
          title: 'Confirm Page',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OuterContentPagesRoutingModule {}
