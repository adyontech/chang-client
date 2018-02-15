import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const OUTER_CONTENT_ROUTES: Routes = [
    {
        path: 'app',
        loadChildren: './outerPages/content-pages/outerContent-pages.module#OuterContentPagesModule'
    }
];
