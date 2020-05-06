// Primary class
class App {


  constructor() {
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
