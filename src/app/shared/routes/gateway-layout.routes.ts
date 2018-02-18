import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const GATEWAY_ROUTES: Routes = [
  {
    path: 'gateway',
    loadChildren: './dataPages/gateway/gateway-pages.module#GatewayPagesModule',
  },
];
