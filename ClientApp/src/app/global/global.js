export var AppSettings = {
  API_ENDPOINT : "http://127.0.0.1:6666/api/",
  studentArray : [],
  maleOfStudents : 0,
  femaleOfStudents : 0,
  getStudentArray() {
    return this.studentArray;
  },
  setStudentArray(arr) {
    this.studentArray = arr;
  },
  getMaleStudents() {
    return this.maleOfStudents;
  },
  setMaleStudents(ms) {
    this.maleOfStudents = ms;
  },
  getFemaleStudents() {
    return this.femaleOfStudents;
  },
  setFemaleStudents(fs) {
    this.femaleOfStudents = fs;
  }
}
