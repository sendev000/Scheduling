import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SettingsContainerComponent } from './settings';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full'
  },
  {
    path: 'student',
    component: StudentComponent,
    data: { title: 'anms.menu.student' }
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    data: { title: 'anms.menu.teacher' }
  },
  {
    path: 'settings',
    component: SettingsContainerComponent,
    data: { title: 'anms.menu.settings' }
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
