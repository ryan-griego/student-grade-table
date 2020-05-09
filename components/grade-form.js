class GradeForm {
  constructor(formElement) {
    this.formElement = formElement;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }

  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var getDataName = formData.get('name');
    var getDataCourse = formData.get('course');
    var getDataGrade = formData.get('grade');
    this.createGrade(getDataName, getDataCourse, getDataGrade);
    event.target.reset();

  }
}
