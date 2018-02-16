import { Routes, RouterModule } from '@angular/router';

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const SETTINGS_ROUTES: Routes = [
    {
        path: 'settings',
        loadChildren: './accountSettings/accountSettings.module#AccountSettingsModule'

    }
];
