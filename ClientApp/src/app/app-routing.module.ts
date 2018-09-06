import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ClassComponent } from './class/class.component';
import { LessonComponent } from './lesson/lesson.component';
import { SemesterComponent } from './semester/semester.component';
import { ScheduleComponent } from './schedule/schedule.component';
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
    path: 'class',
    component: ClassComponent,
    data: { title: 'anms.menu.class' }
  },
  {
    path: 'lesson',
    component: LessonComponent,
    data: { title: 'anms.menu.lesson' }
  },
  {
    path: 'semester',
    component: SemesterComponent,
    data: { title: 'anms.menu.semester' }
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    data: { title: 'anms.menu.schedule' }
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
