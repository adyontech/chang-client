import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupRoutingModule } from './signup.routes'

import { SignupComponent } from './signup.component';
import { SignupService} from './service/signup.service'

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SignupRoutingModule
    ],
    bootstrap: [
        SignupComponent
    ],
    declarations: [
        SignupComponent
    ],
    providers: [
      SignupService
    ]
})
export class SignupModule {
}

