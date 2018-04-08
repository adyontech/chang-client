import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const Common_Outer_ROUTES: Routes = [
    {
        path: 'do',
        loadChildren: './outerPages/content-pages/outerContent-pages.module#OuterContentPagesModule'
    }
];
