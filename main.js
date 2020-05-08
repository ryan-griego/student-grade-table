var table = document.querySelector('table');
console.log(table);

var newGradeTable = new GradeTable(table);
console.log("log newGradeTable", newGradeTable);

var header = document.querySelector('header');
var newPageHeader = new PageHeader(header);

var newApp = new App(newGradeTable);
console.log("log newApp", newApp);

newGradeTable.updateGrades();
newApp.start();
