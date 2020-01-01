$(document).ready(function() {
  //get all the data on app startup

  $("#createEmployee").click(function() {
    $(".employeeForm").css("display", "block");
    $("#dynamicBtn").text("Save Changes");
  });

  $("#dynamicBtn").click(function() {
    //employee form values
    var fname = $("#fname").val();
    var lname = $("#lname").val();
    var email = $("#email").val();
    var age = $("#age").val();
    var gender = $("#gender").val();
    var yearsOfExperience = $("#yearsOfExperience").val();
    var isfulltime = $("#isFullTime").is(":checked");

    //check if you need to create or update an employee
    if ($(this).text() == "Save Changes") {
      // Add an employee with document name as (first letter of firstname).(lastname)
      // Example: Ervis Trupja -> E.Trupja
      var docuName = fname.charAt(0) + "." + lname;
      db.collection("employees")
        .doc(docuName)
        .set({
          fName: fname,
          lName: lname,
          email: email,
          age: age,
          gender: gender,
          yearsOfExperience: yearsOfExperience,
          isFullTime: isfulltime
        })
        .then(function(docRef) {
          $("#operationStatus")
            .html(
              '<div class="alert alert-success"><strong>Success!</strong> Employee was created!</div>'
            )
            .delay(2500)
            .fadeOut("slow");
          $(".employeeForm").css("display", "none");
        })
        .catch(function(error) {
          $("#operationStatus")
            .html(
              '<div class="alert alert-danger"><strong>Error!</strong> Employee was not created!</div>'
            )
            .delay(2500)
            .fadeOut("slow");
        });
    } else {
      // Create a reference to the document by following the same pattern of the document name.
      // Example: Ervis Trupja -> E.Trupja
      var docuName = fname.charAt(0) + "." + lname;
      var sfDocRef = db.collection("employees").doc(docuName);
      sfDocRef
        .set(
          {
            fName: fname,
            lName: lname,
            email: email,
            age: age,
            gender: gender,
            yearsOfExperience: yearsOfExperience,
            isFullTime: isfulltime
          },
          {
            merge: true
          }
        )
        .then(function() {
          $("#operationStatus")
            .html(
              '<div class="alert alert-success"><strong>Success!</strong> Employee was updated.</div>'
            )
            .delay(2500)
            .fadeOut("slow");
          $(".employeeForm").css("display", "none");
        })
        .catch(function(error) {
          $("#operationStatus")
            .html(
              '<div class="alert alert-danger"><strong>Failure!</strong> Employee could not be updated.</div>'
            )
            .delay(2500)
            .fadeOut("slow");
        });
    }
  });

  // Cancel the Employee form
  $("#cancel").click(function() {
    $(".employeeForm").css("display", "none");
  });

  // Get the data of the employee you want to edit
  $("tbody.tbodyData").on("click", "td.editEmployee", function() {
    $(".employeeForm").css("display", "block");
    $("#dynamicBtn").text("Update Employee");

    $("#fname").val(
      $(this)
        .closest("tr")
        .find(".fname")
        .text()
    );
    $("#lname").val(
      $(this)
        .closest("tr")
        .find(".lname")
        .text()
    );
    $("#email").val(
      $(this)
        .closest("tr")
        .find(".email")
        .text()
    );
    $("#age").val(
      $(this)
        .closest("tr")
        .find(".age")
        .text()
    );
    $("#gender").val(
      $(this)
        .closest("tr")
        .find(".gender")
        .text()
    );
    $("#yearsOfExperience").val(
      $(this)
        .closest("tr")
        .find(".yearsofexperience")
        .text()
    );
    $("#isFullTime").prop(
      "checked",
      $(this)
        .closest("tr")
        .find(".isfulltime")
        .text() === "true"
    );
  });

  // Delete employee
  $("tbody.tbodyData").on("click", "td.deleteEmployee", function() {
    //Get the Employee Data
    var fName = $(this)
      .closest("tr")
      .find(".fname")
      .text(); //First Name
    var lName = $(this)
      .closest("tr")
      .find(".lname")
      .text(); //Last Name

    // Create a reference to the document by following the same pattern of the document name.
    // Example: Ervis Trupja -> E.Trupja
    var docuName = fName.charAt(0) + "." + lName;
    db.collection("employees")
      .doc(docuName)
      .delete()
      .then(function() {
        $("#operationStatus")
          .html(
            '<div class="alert alert-success"><strong>Success!</strong> Employee was deleted.</div>'
          )
          .delay(2500)
          .fadeOut("slow");
      })
      .catch(function(error) {
        $("#operationStatus")
          .html(
            '<div class="alert alert-danger"><strong>Failure!</strong> Employee was not deleted.</div>'
          )
          .delay(2500)
          .fadeOut("slow");
      });
  });

  $("#searchEmployee").change(function() {
    console.log("You entered: ", $(this).val());
  });
});
