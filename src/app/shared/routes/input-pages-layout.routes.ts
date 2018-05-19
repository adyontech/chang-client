import { Routes, RouterModule } from "@angular/router";

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const DATA_PAGES_ROUTES: Routes = [
  {
    path: ":owner/:id/form",
    loadChildren: "./dataPages/input-pages/input-pages.module#InputPagesModule"
  },
  {
    path: ":owner/:id/report",
    loadChildren:
      "./dataPages/report-pages/report-pages.module#ReportPagesModule"
  },
  {
    path: ":owner/:id/task",
    loadChildren: "./dataPages/taskboard/taskboard.module#TaskboardModule"
  }
];
export const routeStructure: string = DATA_PAGES_ROUTES[0].path;
