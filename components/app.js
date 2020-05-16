// Primary class
class App {
  constructor(gradeTable, newPageHeader, gradeForm) {
    this.gradeForm = gradeForm;
    this.newPageHeader = newPageHeader;

    this.gradeTable = gradeTable;

    this.showGrade = this.showGrade.bind(this);

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

    this.editGrade = this.editGrade.bind(this);


    this.isEdit = true;
    this.id = 0;
  }

  makeEdit(edit) {
    this.isEdit = true;
    console.log(this.Edit);

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

    this.gradeForm.onSubmit(this.createGrade, this.editGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);

    this.gradeTable.onEditClick(this.editGrade);

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

    this.getGrades();
  }

  showGrade(id) {

    // this.getGrades();
    console.log("showGrade function was run");
    $('#Name').val(id.name);
    $('#Course').val(id.course);

    $('#Grade').val(id.grade);
    $('.add').text("Update");
    $('.add-text').text("Update grade");


    $.ajax({
      method: "GET",
      url: 'https://sgt.lfzprototypes.com/api/grades/' + id,
      dataType: "json",
      headers: { 'x-access-token': "Ypc8MXvf" },
      error: this.handleShowGradeError,
      success: this.handleShowGradeSuccess
    });
  }
  handleShowGradeError(error) {
    console.log()
    console.error(error);
  }

  handleShowGradeSuccess() {

    console.log("YOU DID IT", id);
    $('#Name').val(id.name);
    $('#Course').val(id.course);

    $('#Grade').val(id.grade);
  }




  editGrade(id,name,course,grade) {


    console.log(name);

      $.ajax({
        method: "PATCH",
        url: 'https://sgt.lfzprototypes.com/api/grades/' + id,
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

  handleEditGradeSuccess(id) {
    console.log("from handleeditgradesccuess");
    console.log("log ID in handleeditgrade sccuess", id);

    var name = this.gradeForm.formElement.querySelector('#Name');

    this.id = id.id;
    console.log(id);
    console.log(this.isEdit);


    var name = this.gradeForm.formElement.querySelector('#Name');
    if(this.isEdit) {
      $('#Name').val(id.name);
      $('#Course').val(id.course);

      $('#Grade').val(id.grade);
      console.log("do not reset the form");
      $('.add').text("Update");
      $('.add-text').text("Update grade");

    }

    else {


      this.getGrades();
      this.gradeForm.formElement.reset();
      $('.add').text("Add");
      $('.add-text').text("Add Grade");
      this.isEdit = false;
    }
    // this.isEdit = false;



  }
}
