import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'students',
        loadChildren: () =>
          import('./home/components/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./home/components/courses/courses.module').then((m) => m.CoursesModule),
      },
      {
        path: 'coursesstudents',
        loadChildren: () =>
          import('./home/components/coursesstudents/coursesstudents.module').then(
            (m) => m.CoursesstudentsModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
