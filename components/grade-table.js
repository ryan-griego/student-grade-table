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
    var tableRow = this.renderGradeRow(grades[i], this.deleteGrade, this.editStudent);

    $(tbody).append(tableRow);
    }
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  onEditClick(editStudent) {
    this.editStudent = editStudent;
  }

  renderGradeRow(data, deleteGrade, editStudent) {

    var $row = $('<tr>');
    var $name = $('<td>' + data.name + '</td>');
    var $course = $('<td>' + data.course + '</td>');
    var $grade = $('<td>' + data.grade + '</td>');
    var $cell = $('<td>');
    var $delete = $('<span style="color: darkred;"><i class="fas fa-trash"></i></span>');
    var $edit = $('<span style="color: darkgreen;margin-left: 20px;"><i class="far fa-edit"></i></span>');
    var $cellend = $('</td>');

    var $rowend = $('</tr>');

    $($row).append($name);
    $($row).append($course);
    $($row).append($grade);
    $($row).append($cell);

    $($cell).append($delete);
    $($cell).append($edit);
    $($row).append($cellend);

    $($row).append($rowend);

    $($delete).click(function () {
      deleteGrade(data.id);
    });

    $($edit).click(function () {
      document.getElementById('Name').value = data.name;
      document.getElementById('Course').value = data.course;
      document.getElementById('Grade').value = data.grade;
      document.getElementById('add').value = "Update";
      document.getElementById('add').textContent = "Update";
      document.getElementById('add-text').textContent = "Update Grade";

      editStudent(data.id);

    });
      return $row;
  }
}
