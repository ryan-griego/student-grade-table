// Primary class
class App {
  constructor(gradeTable) {
    this.gradeTable = gradeTable;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
  }

  handleGetGradesError(error) {
    console.error(error);
    console.log("Error");
  }

  handleGetGradesSuccess(grades) {
    console.log("log grades", grades);
    console.log("Success");
    this.gradeTable.updateGrades(grades);
  }

  getGrades() {
    var objects = $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      dataType: "json",
      headers: { 'x-access-token': "Ypc8MXvf" },
      error: this.handleGetGradesError,
      success: this.handleGetGradesSuccess
    });
  }
  start() {
    this.getGrades();
  }
}
