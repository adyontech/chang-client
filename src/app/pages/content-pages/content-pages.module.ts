import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ContentPagesRoutingModule } from './content-pages-routing.module';

// import { ActivationComponent } from './activation/activation.component';
import { ComingSoonPageComponent } from './coming-soon/coming-soon-page.component';
import { ErrorPageComponent } from './error/error-page.component';
import { ForgotPasswordPageComponent } from './forgot-password/forgot-password-page.component';
import { LockScreenPageComponent } from './lock-screen/lock-screen-page.component';
import { LoginPageComponent } from './login/login-page.component';
import { MaintenancePageComponent } from './maintenance/maintenance-page.component';
import { RegisterPageComponent } from './register/register-page.component';
import { SignupComponent } from './signup/signup.component';
import { GlobalVaribles } from './../../shared/globalVariables/globalVariable';

import { SignupService } from './signup/service/signup.service';
import { LoginService } from './login/service/login-page.service';
// import { ActivationService } from './activation/service/activation.service';

@NgModule({
  imports: [CommonModule, ContentPagesRoutingModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule],
  declarations: [
    // ActivationComponent,
    ComingSoonPageComponent,
    ErrorPageComponent,
    ForgotPasswordPageComponent,
    LockScreenPageComponent,
    LoginPageComponent,
    MaintenancePageComponent,
    RegisterPageComponent,
    SignupComponent,
  ],
  providers: [SignupService, GlobalVaribles, LoginService],
})
export class ContentPagesModule {}
