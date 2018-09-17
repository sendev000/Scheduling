import { Component, OnInit, ViewChild } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppSettings } from '../global/global';
import { ExcelService } from '../global/excelService';

@Component({
  selector: 'anms-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;

  schoolArray: any = [];
  studentArray: any = [];
  semesterArray: any = [];
  maxSemester: number;
  termArray: any = [];
  maxTerm: any;
  maxCycleDay: number;
  periodArray: any = [];
  maxPeriod: number;
  courseSectionArray: any = [];
  courseGradeArray: any = [];
  maxGrade: number;
  roomNameArray: any = [];
  roomNumberArray: any = [];
  teacherArray: any = [];

  teacherObj = [];

  selectTeacher: string;
  selectSemester: string;
  selectRoom: string;

  ngOnInit() {
    this.init();
    this.initFromGlobalData();
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
  init() {
    this.selectTeacher = -1;
    this.selectSemester = -1;
    this.selectRoom = -1;
  }
  initFromGlobalData() {
    let scheduleData = AppSettings.getScheduleData();
    this.schoolArray = [];
    this.studentArray = [];
    this.semesterArray = [];
    this.maxSemester = 0;
    this.termArray = [];
    this.maxTerm = 0;
    this.maxCycleDay = 0;
    this.periodArray = [];
    this.maxPeriod = 0;
    this.courseSectionArray = [];
    this.courseGradeArray = [];
    this.maxGrade = 0;
    this.roomNameArray = [];
    this.roomNumberArray = [];
    this.teacherArray = [];
    this.teacherObj = [];

    if (scheduleData && scheduleData.length > 0) {
      for (let i = 0; i < scheduleData.length; i++) {
        let eObj = scheduleData[i];
        if (this.schoolArray.indexOf(eObj['school_name']) === -1) {
          this.schoolArray.push(eObj['school_name']);
        }
        if (this.studentArray.indexOf(eObj['student_number']) === -1) {
          this.studentArray.push(eObj['student_number']);
        }
        if (this.semesterArray.indexOf(eObj['semester']) === -1) {
          this.semesterArray.push(eObj['semester']);
          if (this.maxSemester < eObj['semester'])
            this.maxSemester = eObj['semester'];
        }
        if (this.termArray.indexOf(eObj['term']) === -1) {
          this.termArray.push(eObj['term']);
          if (this.maxTerm < eObj['term']) this.maxTerm = eObj['term'];
        }
        if (this.maxCycleDay < eObj['cycle_day'])
          this.maxCycleDay = eObj['cycle_day'];
        if (this.periodArray.indexOf(eObj['period']) === -1) {
          this.periodArray.push(eObj['period']);
          if (this.maxPeriod < eObj['period']) this.maxPeriod = eObj['period'];
        }
        if (this.courseSectionArray.indexOf(eObj['course_section']) === -1) {
          this.courseSectionArray.push(eObj['course_section']);
        }
        if (this.courseGradeArray.indexOf(eObj['course_grade']) === -1) {
          this.courseGradeArray.push(eObj['course_grade']);
          if (this.maxGrade < eObj['course_grade'])
            this.maxGrade = eObj['course_grade'];
        }
        if (this.roomNameArray.indexOf(eObj['room_name']) === -1) {
          this.roomNameArray.push(eObj['room_name']);
        }
        if (this.roomNumberArray.indexOf(eObj['room_number']) === -1) {
          this.roomNumberArray.push(eObj['room_number']);
        }
        if (this.teacherArray.indexOf(eObj['teacher_name']) === -1) {
          this.teacherArray.push(eObj['teacher_name']);
        }
      }

      this.semesterArray.sort();
      this.termArray.sort();
      this.periodArray.sort();
      this.roomNameArray.sort();
    }
  }

  changeTeacher($event) {
    this.updateContent();
  }
  changeSemester($event) {
    this.updateContent();
  }
  changeRoom($event) {
    this.updateContent();
  }
  updateContent() {
    console.log(this.selectTeacher, this.selectSemester, this.selectRoom);
    let scheduleData = AppSettings.getScheduleData();
    let teacherTempData = {},
      maxLength = 0;
    for (let i = 0; i < this.teacherArray.length; i++) {
      teacherTempData[this.teacherArray[i]] = [];
    }
    for (let i = 0; i < scheduleData.length; i++) {
      let eObj = scheduleData[i];
      if (
        teacherTempData[eObj['teacher_name']].indexOf(
          eObj['course_section']
        ) === -1
      ) {
        teacherTempData[eObj['teacher_name']].push(eObj['course_section']);
        if (maxLength < teacherTempData[eObj['teacher_name']].length)
          maxLength = teacherTempData[eObj['teacher_name']].length;
      }
    }

    this.teacherObj = [];
    this.teacherObj.push({ teacher: 'Teacher' });
    for (let i = 0; i < maxLength; i++) {
      this.teacherObj[0]['course_' + (i + 1).toString()] = 'Course';
    }
    for (let each in teacherTempData) {
      let obj = {};
      obj['teacher'] = each;
      for (let i = 0; i < teacherTempData[each].length; i++) {
        obj['course_' + (i + 1).toString()] = teacherTempData[each][i];
      }
      this.teacherObj.push(obj);
    }
    console.log(this.teacherObj);
  }
}
