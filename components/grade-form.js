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

    var clickedEditorUpdate = event.currentTarget;
    console.log("clickedEditorUpdate", clickedEditorUpdate);

    // console.log(this.isEdit);
    // console.log(event);

    // console.log(newApp.isEdit());


    event.preventDefault();
    var formData = new FormData(event.target);
    var getDataName = formData.get('name');
    var getDataCourse = formData.get('course');
    var getDataGrade = formData.get('grade');
    var checkEdit = newApp.isEdit;
    var id = newApp.id;

    if(checkEdit) {
      // add a new grade to the table
      // NEEDS TO PASS IN THE ID OF THE CLICKED STUDENT
      this.editGrade(id,getDataName, getDataCourse, getDataGrade);

      event.target.reset();

      console.log("edit grade function did run");
      console.log("ID of clicked student", id);
      $('.add').text("Add");
      $('.add-text').text("Add grade");
      $('#Name').val("");
      $('#Course').val("");

      $('#Grade').val("");

      newApp.isEdit = false;

      event.target.reset();

      // var tbody = newGradeTable.tableElement.querySelector('tbody');
      // $(tbody).empty();
      newGradeTable.updateGrades()
      console.log("the current status of edit happens after editgrade", checkEdit);


    }

    else{
      // edit the current grade in the table
      this.createGrade(getDataName, getDataCourse, getDataGrade);
      event.target.reset();
      console.log("the current status of edit happens after creatgrade", checkEdit);


    }




  }
}
