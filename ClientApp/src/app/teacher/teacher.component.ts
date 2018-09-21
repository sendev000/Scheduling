import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { AppSettings } from '../global/global';
import { ExcelService } from '../global/excelService';

@Component({
  selector: 'anms-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
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
  totalAnalysis: number;
  maxColumn: number;
  gridCSS: string;

  selectTeacher: number;
  selectSemester: number;
  selectRoom: number;

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
    this.totalAnalysis = 0;
    this.maxColumn = 0;

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
    let tempData = {}, count;
    let teacherHash = {}, periodHash = {}, semesterHash = {}, hashPeriodSemester = {};
    for (let i=0;i<scheduleData.length;i++)
    {
      let eObj = scheduleData[i];
      let check = true;
      if (this.selectTeacher != -1 && this.selectTeacher != eObj['teacher_name'])
        check = false;
      if (this.selectSemester != -1 && this.selectSemester != eObj['semester'])
        check = false;
      if (this.selectRoom != -1 && this.selectRoom != eObj['room_name'])
        check = false;
      if (check)
      {
        let key = eObj['teacher_name'] + "|||" + 
                  eObj['semester'].toString() + "|||" + 
                  eObj['period'].toString();
        if (!tempData[key])
          tempData[key] = [];
        else
          tempData[key].push({
            "course_section": eObj['course_section'],
            "student_number": eObj['student_number'],
            "room_name": eObj['room_name']
          })
      }
    }
    this.teacherObj[0] = [];
    this.teacherObj[0].push("Teacher");
    for (let i=0;i<this.semesterArray.length;i++) {
      for (let j=0;j<this.periodArray.length;j++) {
        let key = "S" + i.toString() + " P" + j.toString();
        this.teacherObj[0].push(key);
        hashPeriodSemester[key] = i * this.periodArray.length + j;
      }
    }
    this.maxColumn = this.semesterArray.length * this.periodArray.length + 1;
    for (let i=0;i<this.teacherArray.length;i++) {
      this.teacherObj[ i+1 ] = [];
      this.teacherObj[ i+1 ][0] = this.teacherArray[i];
      teacherHash[ this.teacherArray[i] ] = i;
    }
    for (let i=0;i<this.semesterArray.length;i++) {
      semesterHash[ this.semesterArray[i] ] = i;
    }
    for (let i=0;i<this.periodArray.length;i++) {
      periodHash[ this.periodArray[i] ] = i;
    }


    for (let each in tempData) {
      let split = each.split("|||");
      let obj = tempData[each];
      let indR = teacherHash[ split[0] ];
      let indS = semesterHash[ split[1] ];
      let indP = periodHash[ split[2] ];
      let indSPKey = "S" + indS.toString() + " P" + indP.toString();
      let indSP = hashPeriodSemester[indSPKey];
      this.teacherObj[indR+1][indSP + 1] = tempData[each];
    }

    count = this.teacherObj.length;
    for (let i=1;i<count;i++) {
      let obj = this.teacherObj[i], emptyCount = 0;
      for (let j=1;j<this.maxColumn;j++) {
        let arr = obj[j];
        if (arr && arr.length > 0){
          let sn = [];
          for (let k=0;k<arr.length;k++) {
            if (sn.indexOf(arr[k]['student_number']) === -1)
              sn.push(arr[k]['student_number']);
          }
          obj[j] = arr[0]['course_section'] + " " + sn.length.toString() + " " + arr[0]['room_name'];
        }
        if (!obj[j]){
          obj[j] = "";
          emptyCount ++;
        }
      }
      if (emptyCount == this.maxColumn - 1){
        this.teacherObj.splice(i,1);
        i--; count--;
      }
    }
    this.totalAnalysis = this.teacherObj.length - 1;
    let min = Math.floor(100/this.maxColumn) - 1;
    let max = Math.ceil(100/this.maxColumn) - 1;
    this.gridCSS = 'repeat(auto-fit, minmax(' + min + '%,' + max + '%))';
    // let scheduleData = AppSettings.getScheduleData();
    // let teacherTempData = {}, middleData = [],
    //   maxLength = 0;

    // if (this.selectTeacher == -1){
    //   for (let i = 0; i < this.teacherArray.length; i++) {
    //     teacherTempData[this.teacherArray[i]] = [];
    //   }
    // }
    // else
    //   teacherTempData[this.selectTeacher] = [];
    // for (let i = 0; i < scheduleData.length; i++) {
    //   let eObj = scheduleData[i];
    //   let check = true;
    //   if (!teacherTempData[eObj['teacher_name']]) check = false;
    //   if (this.selectSemester != -1 && this.selectSemester !== eObj['semester'])
    //     check = false;
    //   if (this.selectRoom != -1 && this.selectRoom !== eObj['room_name'])
    //     check = false;
    //   if (check)
    //   {
    //     let cs = eObj['course_section'].split("-");
    //     teacherTempData[eObj['teacher_name']].push({
    //       "course": cs[0],
    //       "section": cs[1],
    //       "student_number": eObj['student_number'],
    //       "semester": eObj['semester'],
    //       "room_name": eObj['room_name'] 
    //     });
    //   }
    // }

    // this.teacherObj = [];
    // middleData = [];

    // for (let each in teacherTempData) {
    //   let key, obj = {}, sorted = {};
    //   for (let i=0;i<teacherTempData[each].length;i++)
    //   {
    //     key = teacherTempData[each][i]['semester'] + "|||" + 
    //             teacherTempData[each][i]['course']
    //              + "|||" + teacherTempData[each][i]['room_name'];
    //     if (!obj[key]) obj[key] = [];
    //     if (obj[key].indexOf(teacherTempData[each][i]['student_number']) === -1)
    //     {
    //       obj[key].push(teacherTempData[each][i]['student_number']);
    //     }
    //   }
    //   Object.keys(obj).sort().forEach(function(key) {
    //     sorted[key] = obj[key];
    //   });

    //   middleData[each] = sorted;
    // }

    // for (let each in middleData) {
    //   let names = each.split(" ");
    //   for (let each1 in middleData[each]){
    //     let key1 = each1.split("|||");
    //     let obj = {};
    //     obj["fullname"] = each;
    //     obj["lastname_semester"] = names[1] + "___" + key1[0];
    //     obj["semester"] = key1[0];
    //     obj["course"] = key1[1];
    //     obj["room"] = key1[2];
    //     obj["students"] = middleData[each][each1];
    //     obj["nos"] = obj["students"].length;
    //     this.teacherObj.push(obj);
    //   }
    // }
    // this.teacherObj.sort(compare);
    // this.totalAnalysis = this.teacherObj.length;
  }
}

function compare(a,b) {
  if (a.lastname_semester < b.lastname_semester)
    return -1;
  if (a.lastname_semester > b.lastname_semester)
    return 1;
  return 0;
}

