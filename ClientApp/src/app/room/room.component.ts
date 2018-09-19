import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppSettings } from '../global/global';

@Component({
  selector: 'anms-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
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

  roomObj = [];
  totalAnalysis: number;

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
    this.roomObj = [];
    this.totalAnalysis = 0;

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

      this.updateContent();
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
    let scheduleData = AppSettings.getScheduleData();
    let teacherTempData = {}, middleData = [],
      maxLength = 0;

    if (this.selectTeacher == -1){
      for (let i = 0; i < this.teacherArray.length; i++) {
        teacherTempData[this.teacherArray[i]] = [];
      }
    }
    else
      teacherTempData[this.selectTeacher] = [];
    for (let i = 0; i < scheduleData.length; i++) {
      let eObj = scheduleData[i];
      let check = true;
      if (!teacherTempData[eObj['teacher_name']]) check = false;
      if (this.selectSemester != -1 && this.selectSemester !== eObj['semester'])
        check = false;
      if (this.selectRoom != -1 && this.selectRoom !== eObj['room_name'])
        check = false;
      if (check)
      {
        let cs = eObj['course_section'].split("-");
        teacherTempData[eObj['teacher_name']].push({
          "course": cs[0],
          "section": cs[1],
          "student_number": eObj['student_number'],
          "semester": eObj['semester'],
          "room_name": eObj['room_name'] 
        });
      }
    }

    this.roomObj = [];
    middleData = [];

    for (let each in teacherTempData) {
      let key, obj = {}, sorted = {};
      for (let i=0;i<teacherTempData[each].length;i++)
      {
        key = teacherTempData[each][i]['room_name'] + "|||" + 
                teacherTempData[each][i]['semester']
                 + "|||" + teacherTempData[each][i]['course'];
        if (!obj[key]) obj[key] = [];
        if (obj[key].indexOf(teacherTempData[each][i]['student_number']) === -1)
        {
          obj[key].push(teacherTempData[each][i]['student_number']);
        }
      }
      Object.keys(obj).sort().forEach(function(key) {
        sorted[key] = obj[key];
      });

      middleData[each] = sorted;
    }

    for (let each in middleData) {
      let names = each.split(" ");
      // let obj1 = {data: [], name: each, lastname: names[1]};
      for (let each1 in middleData[each]){
        let key1 = each1.split("|||");
        let obj = {};
        obj["fullname"] = each;
        obj["sort"] = key1[0] + "___" + key1[1];
        obj["room"] = key1[0];
        obj["semester"] = key1[1];
        obj["course"] = key1[2];
        obj["students"] = middleData[each][each1];
        obj["nos"] = obj["students"].length;
        this.roomObj.push(obj);
        // obj1['data'].push(obj);
      }
      // if (obj1['data'].length > 0)
        // this.roomObj.push(obj1);
    }
    this.roomObj.sort(compare);
    this.totalAnalysis = this.roomObj.length;
  }
}

function compare(a,b) {
  if (a.sort < b.sort)
    return -1;
  if (a.sort > b.sort)
    return 1;
  return 0;
}
