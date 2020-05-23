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



    // if(checkEdit) {
    //   // edit a grade to the table
    //   // NEEDS TO PASS IN THE ID OF THE CLICKED STUDENT
    //   this.editGrade(id,getDataName, getDataCourse, getDataGrade);

    //   // event.target.reset();

    //   console.log("edit grade function did run");
    //   console.log("ID of clicked student", id);
    //   $('.add').text("Add");
    //   $('.add-text').text("Add grade");
    //   $('#Name').val("");
    //   $('#Course').val("");

    //   $('#Grade').val("");

    //   newApp.isEdit = false;

    //   newGradeTable.updateGrades(id, getDataName, getDataCourse, getDataGrade)
    //   console.log("the current status of edit happens after editgrade", checkEdit);

    // }

    // else{
    //   // edit the current grade in the table
    //   this.createGrade(getDataName, getDataCourse, getDataGrade);
    //   event.target.reset();
    //   console.log("the current status of edit happens after creatgrade", checkEdit);


    // }




  }
}
