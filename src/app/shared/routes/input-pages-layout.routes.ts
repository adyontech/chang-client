import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const DATA_PAGES_ROUTES: Routes = [
  {
    path: ':owner/:id/form',
    // loadChildren: './dataPages/gateway/gateway-pages.module#GatewayPagesModule',
    loadChildren: './dataPages/input-pages/input-pages.module#InputPagesModule',
  },
  {
    path: ':owner/:id/report',
    // loadChildren: './dataPages/gateway/gateway-pages.module#GatewayPagesModule',
    loadChildren: './dataPages/report-pages/report-pages.module#ReportPagesModule',
  },
];
export const routeStructure: string = DATA_PAGES_ROUTES[0].path;
