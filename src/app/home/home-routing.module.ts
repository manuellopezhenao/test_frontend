import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '**', redirectTo: 'students' },
      {
        path: 'students',
        loadChildren: () =>
          import('./components/students/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('./components/courses/courses.module').then((m) => m.CoursesModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
