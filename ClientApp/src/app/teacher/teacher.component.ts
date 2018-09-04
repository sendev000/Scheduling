import { Component, OnInit } from '@angular/core';

import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'anms-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
