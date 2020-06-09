class CachedGrades {
  constructor(grades) {
    this.grades = grades;
    this.savedTable = [];
  }

  storeGrades(grades) {
    this.savedTable = grades;
  }

  createCachedGrade(grade) {
    this.savedTable.push(grade);
  }

  updateCachedGrade(grade) {
    var matchedId = this.savedTable.findIndex(x => x.id === grade.id);
    this.savedTable[matchedId] = grade;
  }

  deleteCachedGrade(id) {
    var matchedId = this.savedTable.findIndex(x => x.id === id);
    this.savedTable.splice(matchedId, 1);
  }
}
