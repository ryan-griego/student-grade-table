
class GradeTable  {
  constructor(tableElement, noGradesElement) {
   this.tableElement = tableElement;
   this.noGradesElement = noGradesElement;
  }

  updateGrades(grades) {
    if (grades != 0) {
      $('p').addClass('d-none');
    }

    else {
      $('p').addClass('d-block');
    }
    var tbody = this.tableElement.querySelector('tbody');
    $(tbody).empty();

    var $header = $('<tr>' + '<th><strong>Name</strong></th>' + '<th><strong>Course</strong></th>' + '<th><strong>Grade</strong></th>' + '<th><strong>Operations</strong></th>' + '</tr>');

    $(tbody).append($header);

    for(var i = 0; i < grades.length; i++) {
      // has editgrade bound to grade-table class
    var tableRow = this.renderGradeRow(grades[i], this.deleteGrade, this.editGrade);

    $(tbody).append(tableRow);
    }
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  onEditClick(editGrade) {
      // DOES NOT HAVE editgrade bound to grade-table class
    this.editGrade = editGrade;
  }

  renderGradeRow(data, deleteGrade, editGrade) {

      var $row = $('<tr>');
      var $name = $('<td>' + data.name + '</td>');
      var $course = $('<td>' + data.course + '</td>');
      var $grade = $('<td>' + data.grade + '</td>');
    var $delete = $('<td><button class="btn btn-danger">DELETE</button></td>');
    var $edit = $('<button class="btn btn-success">EDIT</button>');

      var $rowend = $('</tr>');

      $($row).append($name);
      $($row).append($course);
      $($row).append($grade);
      $($row).append($delete);
    $($row).append($edit);
      $($row).append($rowend);
      $($delete).click(function () {

        deleteGrade(data.id);
      });
    $($edit).click(function () {
      // RUN A FUNCTION THAT IS DECLARED IN APP.JS

        editGrade(data.id,data.name,data.course,data.grade);
        // debugger

        // this.makeEdit;
    });
      return $row;
  }
}
