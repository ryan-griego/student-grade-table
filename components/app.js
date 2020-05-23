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



    this.gradeCapture = [];

    this.editStudent = this.editStudent.bind(this);
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
    this.gradeCapture = grades;

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
    for (var i = 0; i < this.gradeCapture.length; i++) {

      if (this.gradeCapture[i].id == this.deleteGrade);
        this.gradeCapture.splice(i, 1);
    }
    this.getGrades();

    // this.isEdit = false;

  }

  showGrade(id) {

    console.log("showGrade function was run");
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




  editGrade(name,course,grade) {
    console.log("edit grade activated");
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

    // for (var i = 0; i < this.gradeCapture.length; i++) {
    //   if (this.gradeCapture[i].id == this.editGrade.id) {
    //     debugger
    //     this.gradeCapture[i].name = this.editGrade.name;
    //     this.gradeCapture[i].course = this.editGrade.course;
    //     this.gradeCapture[i].grade = this.editGrade.grade;
    //   }
    // }


    this.getGrades();
    // $('.add').text("Add");
    // $('.add-text').text("Add Grade");
    var name = this.gradeForm.formElement.querySelector('#Name');

    this.id = id;



    var name = this.gradeForm.formElement.querySelector('#Name');


         // this code below is not doing anything


      $('#Name').val(id.name);
      $('#Course').val(id.course);

      $('#Grade').val(id.grade);

      $('.add').text("Add");
      $('.add-text').text("Add grade");



  }

  editStudent(id) {

    this.id = id;

  }

}
