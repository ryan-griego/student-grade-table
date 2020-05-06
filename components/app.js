// Primary class
class App {


  constructor() {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);

  }

  handleGetGradesError(error) {
    console.error(error);

  }

  handleGetGradesSuccess(grades) {
    console.log(grades);

  }

  getGrades() {
    var objects = $.ajax({
      method: "GET",
      url: "https://sgt.lfzprototypes.com/api/grades",
      dataType: "json",
      error: handleGetGradesError,
      success: handleGetGradesSuccess
    });
  }

  start() {
    this.getGrades;
  }




}
