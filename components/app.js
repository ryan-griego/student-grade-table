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
    this.gradeCapture = grades;
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
    this.gradeCapture.push(response);
    this.gradeTable.updateGrades(newApp.gradeCapture);
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
    for (var i = 0; i < this.gradeCapture.length; i++) {

      if (this.gradeCapture[i].id == this.deleteGrade);
        this.gradeCapture.splice(i, 1);
    }
    this.getGrades();
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

  handleEditGradeSuccess(id, name, course, grade) {

    for (var i = 0; i < this.gradeCapture.length; i++) {
      if (this.gradeCapture[i].id == id) {
        this.gradeCapture[i].name = name;
        this.gradeCapture[i].course = course;
        this.gradeCapture[i].grade = grade;
      }
    }

    this.getGrades();
  }

  editStudent(id) {
    this.id = id;
  }
}
