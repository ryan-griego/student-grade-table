// Primary class
class App {
  constructor(gradeTable, newPageHeader, gradeForm, cachedGrades) {

    this.cachedGrades = cachedGrades;

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

    this.editGrade = this.editGrade.bind(this);
    this.handleEditGradeError = this.handleEditGradeError.bind(this);
    this.handleEditGradeSuccess = this.handleEditGradeSuccess.bind(this);

    this.gradeCapture = [];
    this.editStudent = this.editStudent.bind(this);
    this.id = 0;
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

    document.getElementById('add').textContent = "Add";
    document.getElementById('add-text').textContent = "Add Grade";
    this.gradeTable.updateGrades(grades);
    this.cachedGrades.storeGrades(grades);
    console.log("show me the cachedGrades", this.cachedGrades.savedTable);

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
    this.gradeForm.onSubmit(this.createGrade, this.editGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onEditClick(this.editStudent);
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

  handleCreateGradeSuccess(response) {
    this.cachedGrades.createCachedGrade(response);
    this.gradeTable.updateGrades(this.cachedGrades.savedTable);
  }

  deleteGrade(id){
    this.deleteGradeId = id;
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

    this.cachedGrades.deleteCachedGrade(this.deleteGradeId);
    this.gradeTable.updateGrades(this.cachedGrades.savedTable);

  }

  editGrade(name,course,grade) {
      $.ajax({
        method: "PATCH",
        url: 'https://sgt.lfzprototypes.com/api/grades/' + this.id,
        dataType: "json",
        data: {
          "name": name,     // Optional
          "course": course,
          "grade": grade        // Optional
        },

        headers: { 'x-access-token': "Ypc8MXvf" },
        error: this.handleEditGradeError,
        success: this.handleEditGradeSuccess
      });

  }

  handleEditGradeError(error) {
    console.error(error);
  }

  handleEditGradeSuccess(grade) {

    this.cachedGrades.updateCachedGrade(grade);
    this.gradeTable.updateGrades(this.cachedGrades.savedTable);

  }

  editStudent(id) {
    this.id = id;
  }
}
