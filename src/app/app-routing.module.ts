import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';

import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import { OUTER_CONTENT_ROUTES } from './shared/routes/outerContent-layout.routes';
import { COMMON_PAGE_ROUTES } from './shared/routes/commonPages-layout.routes';
import { GATEWAY_ROUTES } from './shared/routes/gateway-layout.routes';
import { DATA_PAGES_ROUTES } from './shared/routes/input-pages-layout.routes';
import { SETTINGS_ROUTES } from './shared/routes/setting.route';

import { AuthGuard } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
  path: '',
  redirectTo: 'gateway',
  pathMatch: 'full',
},
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
    component: SettingsLayoutComponent,
    data: { title: 'Gateway' },
    children: GATEWAY_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'form' },
    children: DATA_PAGES_ROUTES,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'App Views' },
    children: OUTER_CONTENT_ROUTES,
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'App Views' },
    children: COMMON_PAGE_ROUTES,
    // canActivate: [AuthGuard],
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
