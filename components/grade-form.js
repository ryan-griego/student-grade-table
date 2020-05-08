class GradeForm {
  constructor(formElement) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formElement = formElement;
    this.formElement.addEventListener('submit', this.handleSubmit);

  }

  onSubmit(createGrade) {
    this.createGrade = createGrade;

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("hi");
    var formData = new FormData(event.target);
    formData.get('name', 'course', 'grade');
    debugger
    this.createGrade(name,course,grade);
    event.target.reset();

  }
}
