
class GradeTable  {
  constructor(tableElement) {
   this.tableElement = tableElement;
  }

  updateGrades(grades) {
    console.log(this.tableElement);
    var tbody = this.tableElement.querySelector('tbody');
    $(tbody).empty();

    var $header = $('<tr>' + '<td><strong>Name</strong></td>' + '<td><strong>Course</strong></td>' + '<td><strong>Grade</strong></td>' + '</tr>');
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
    console.log(grades);
  }
}
