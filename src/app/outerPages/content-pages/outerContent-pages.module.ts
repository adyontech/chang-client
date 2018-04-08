import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { OuterContentPagesRoutingModule } from './outerContent-pages-routing.module';

import { ActivationComponent } from './activation/activation.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { SignupComponent } from './signup/signup.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ConfirmComponent } from './mojoConfirm/confirm.component';
import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';

import { SignupService } from './signup/service/signup.service';
import { LoginService } from './login/service/login-page.service';
import { ActivationService } from './activation/service/activation.service';
import { PassForgotService } from './forgot-password/service/forgot-password-page.service';
import { UpdatePasswordService } from './update-password/service/update-password.service';
import { ConfirmService } from './mojoConfirm/service/confirm.service';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  imports: [
    CommonModule,
    OuterContentPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RecaptchaModule,
  ],
  declarations: [
    ActivationComponent,
    ConfirmComponent,
    ForgotPasswordPageComponent,
    LoginPageComponent,
    SignupComponent,
    UpdatePasswordComponent,
  ],
  providers: [
    ConfirmService,
    SignupService,
    GlobalVaribles,
    LoginService,
    ActivationService,
    PassForgotService,
    UpdatePasswordService,
  ],
})
export class OuterContentPagesModule {}
