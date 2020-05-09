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
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
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
  start() {

    this.getGrades();

    this.gradeForm.onSubmit(this.createGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
  }

  createGrade(name,course,grade) {
     $.ajax({
        method: "POST",
        url: "https://sgt.lfzprototypes.com/api/grades",
        data: {
          "name": name,
          "course": course,
          "grade": grade
        },
        dataType: "json",
        headers: { 'x-access-token': "Ypc8MXvf" },
        error: this.handleCreateGradeError,
        success: this.handleCreateGradeSuccess
      });
  }

  handleCreateGradeError(error) {
    console.error(error);
  }

  handleCreateGradeSuccess() {
    $('tbody').empty();
    this.getGrades();
  }

  deleteGrade(id){
    $.ajax({
      method: "DELETE",
      url: 'https://sgt.lfzprototypes.com/api/grades/' + id,
      dataType: "json",
      headers: { 'x-access-token': "Ypc8MXvf" },
      error: this.handleDeleteGradeError,
      success: this.handleDeleteGradeSuccess
    });
  }

  handleDeleteGradeError(error){
    console.error(error);
  }

  handleDeleteGradeSuccess() {
    $('tbody').empty();
    this.getGrades();
  }
}
