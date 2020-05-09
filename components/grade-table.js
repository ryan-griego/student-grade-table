
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

    $(tbody).empty();

    var $header = $('<tr>' + '<td><strong>Name</strong></td>' + '<td><strong>Course</strong></td>' + '<td><strong>Grade</strong></td>' + '<td><strong>Operations</strong></td>' + '</tr>');

    $('tbody').append($header);

    for(var i = 0; i < grades.length; i++) {
    var tbody = this.tableElement.querySelector('tbody');
    var tableRow = this.renderGradeRow(grades[i], this.deleteGrade);

    $(tbody).append(tableRow);
    }
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade) {

      var $row = $('<tr>');
      var $name = $('<td>' + data.name + '</td>');
      var $course = $('<td>' + data.course + '</td>');
      var $grade = $('<td>' + data.grade + '</td>');
      var $delete = $('<td><button class="btn btn-danger">DELETE</button></td>');
      var $rowend = $('</tr>');

      $($row).append($name);
      $($row).append($course);
      $($row).append($grade);
      $($row).append($delete);
      $($row).append($rowend);
      $($delete).click(function () {

        deleteGrade(data.id);
      });
      return $row;
  }
}
