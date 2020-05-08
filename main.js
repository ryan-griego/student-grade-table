table = document.querySelector('table');
console.log(table);

var newGradeTable = new GradeTable(table);
console.log("log newGradeTable", newGradeTable);

var newApp = new App(newGradeTable);
console.log("log newApp", newApp);

newGradeTable.updateGrades();
newApp.start();
