var table = document.querySelector('table');
var p = document.querySelector('p');

var newGradeTable = new GradeTable(table, p);

var header = document.querySelector('header');
var newPageHeader = new PageHeader(header);

var form = document.querySelector('form');

var newGradeForm = new GradeForm(form);

var newApp = new App(newGradeTable, newPageHeader, newGradeForm);

newApp.start();
