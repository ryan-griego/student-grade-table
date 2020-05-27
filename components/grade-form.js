  class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  onSubmit(createGrade, editGrade) {
    this.createGrade = createGrade;
    this.editGrade = editGrade;
  }

  handleSubmit(event) {
    event.preventDefault();
    var clickedEditorUpdate = event.currentTarget;
    console.log("clickedEditorUpdate", clickedEditorUpdate);

    var formData = new FormData(event.target);
    var getDataName = formData.get('name');
    var getDataCourse = formData.get('course');
    var getDataGrade = formData.get('grade');

    console.log(document.getElementById('add').value);
    if (document.getElementById('add').value == 'Add') {
      this.createGrade(getDataName, getDataCourse, getDataGrade);
    }
    else {
      this.editGrade(getDataName, getDataCourse, getDataGrade);
      document.getElementById('add').value = 'Add';
    }
    event.target.reset();
  }
}
