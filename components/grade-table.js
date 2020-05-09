
class GradeTable  {
  constructor(tableElement) {
   this.tableElement = tableElement;
  }

  updateGrades(grades) {
    var tbody = this.tableElement.querySelector('tbody');
    $(tbody).empty();

    var $header = $('<tr>' + '<td><strong>Name</strong></td>' + '<td><strong>Course</strong></td>' + '<td><strong>Grade</strong></td>' + '<td><strong>Operations</strong></td>' + '</tr>');

    $('tbody').append($header);

    $.each(grades, function (id, item) {
      var $row = $('<tr>');
      var $name = $('<td>' + item.name + '</td>');
      var $course = $('<td>' + item.course + '</td>');
      var $grade = $('<td>' + item.grade + '</td>');
      var $rowend = $('</tr>');
      $(tbody).append($row);
      $($row).append($name);
      $($row).append($course);
      $($row).append($grade);
      $('tbody').append($rowend);
    });
  }

  onDeleteClick(deleteGrade) {
    this.deleteGrade = deleteGrade;
  }

  renderGradeRow(data, deleteGrade) {

    $.each(data, function (id, data) {
      var $row = $('<tr>');
      var $name = $('<td>' + data.name + '</td>');
      var $course = $('<td>' + data.course + '</td>');
      var $grade = $('<td>' + data.grade + '</td>');
      var $delete = $('<td><button class="btn btn-success">DELETE</button></td>');
      var $rowend = $('</tr>');

      // $(tbody).append($row);
      $($row).append($name);
      $($row).append($course);
      $($row).append($grade);
      $($row).append($delete);
      $($delete).click(function () {
        this.deleteGrade(data.id);
      });
      $('tbody').append($rowend);
    });

      return $row;
  }

}
