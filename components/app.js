// Primary class
class App {
  constructor(gradeTable, newPageHeader, gradeForm) {
    this.gradeForm = gradeForm;
    this.newPageHeader = newPageHeader;
    this.gradeTable = gradeTable;
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);

  }

  handleGetGradesError(error) {
    console.error(error);
  }

  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);
    var total = 0;
    var totalGrade = [];
    var totalAverage = 0;

    $.each(grades, function (id, item) {
      var grade = item.grade;
      total += grade;
      totalGrade.push(item.grade);
      totalAverage = total / grades.length;
    });
    this.newPageHeader.updateAverage(totalAverage);
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

    this.gradeForm.onSubmit(this.createGrade);
  }

  createGrade(name,course,grade) {
    console.log(name,course,grade);

  }

  handleCreateGradeError(error) {
    console.error(error);
  }

  handleCreateGradeSuccess() {
    this.getGrades();
  }

}
