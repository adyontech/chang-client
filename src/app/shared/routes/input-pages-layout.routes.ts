import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const INPUT_PAGES_ROUTES: Routes = [
  {
    path: 'form',
    // loadChildren: './dataPages/gateway/gateway-pages.module#GatewayPagesModule',
    loadChildren: './dataPages/input-pages/input-pages.module#InputPagesModule',
  },
];
