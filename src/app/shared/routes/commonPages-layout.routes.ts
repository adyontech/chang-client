import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const COMMON_PAGE_ROUTES: Routes = [
    {
        path: 'do',
        loadChildren: './outerPages/common-pages/commonContent-pages.module#CommonContentPagesModule'
    }
];
