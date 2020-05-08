var table = document.querySelector('table');

var newGradeTable = new GradeTable(table);

var header = document.querySelector('header');
var newPageHeader = new PageHeader(header);

var form = document.querySelector('form');
var newGradeForm = new GradeForm(form);

var newApp = new App(newGradeTable, newPageHeader, newGradeForm);

newGradeTable.updateGrades();
newApp.start();
