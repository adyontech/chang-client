import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';

import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import { OUTER_CONTENT_ROUTES } from './shared/routes/outerContent-layout.routes';
import { SETTINGS_ROUTES } from './shared/routes/setting.route';

import { AuthGuard } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'full Views' },
    children: Full_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: CONTENT_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'App Views' },
    children: OUTER_CONTENT_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: SettingsLayoutComponent,
    data: { title: 'Setting' },
    children: SETTINGS_ROUTES,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
