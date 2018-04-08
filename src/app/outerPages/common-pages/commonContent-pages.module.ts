import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CommonContentPagesRoutingModule } from './commonContent-pages-routing.module';

// import { ActivationComponent } from './activation/activation.component';
// import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
// import { LoginPageComponent } from './login/login-page.component';
// import { SignupComponent } from './signup/signup.component';
// import { UpdatePasswordComponent } from './update-password/update-password.component';
import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmService } from './confirm/service/confirm.service';

@NgModule({
  imports: [
    CommonModule,
    CommonContentPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [ConfirmComponent],
  providers: [ConfirmService, GlobalVaribles],
})
export class CommonContentPagesModule {}
