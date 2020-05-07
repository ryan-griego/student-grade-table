table = document.querySelector('table');
console.log(table);

var newGradeTable = new GradeTable(table);
console.log("log newGradeTable", newGradeTable);


var newApp = new App(this.GradeTable);
console.log("log newApp", newApp);

newApp.start();
