// View all employees.
$(document).ready(function() {
    $.get("http://localhost:3000/employees", function(data) {
      for (let i = 0; i < data.length; i++) {
        const row = `<tr><td>${data[i].id}</td><td>${data[i].firstName}</td><td>${data[i].lastName}</td><td><input id=${data[i].id} class="chk" type="checkbox" /></td><td><button id=${data[i].id} type="button" class="btn btn-dark btn-block mb-2 w-200" onclick="viewEmployee(this.id)" data-toggle="modal" data-target="#exampleModal">View</button></td></tr>`;
      //   this enebles to view all employees at once in a table
        $("tbody").append(row);
      }
    });
  });

// To view one employee details
function viewEmployee(x) {
  let path = `http://localhost:3000/employees/${x}`;
// This is the location of the data of a single employee
  $.get(path, function(data) {
    console.log(data);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let address = data.address;
    let gender = data.gender;
    let email = data.email;
    let phoneNo = data.phoneNo;
    let role = data.role;
    // Extracts the data of the employee from the data base

    $("#editFirstName").val(firstName);
    $("#editLastName").val(lastName);
    $("#editAddress").val(address);
    $("#editEmail").val(email);
    $("#editPhoneNo").val(phoneNo);
    $("#editRole").val(role);
    $("#editGender").val(gender);
    // Publishes the extracted data unto the modal form
  });
// To Update an employee details
  $("#updateEmployee").click(function() {
    const id = x;
    const firstName = $("#editFirstName").val();
    const lastName = $("#editLastName").val();
    const address = $("#editAddress").val();
    const gender = $("#editGender").val();
    const email = $("#editEmail").val();
    const phoneNo = $("#editPhoneNo").val();
    const role = $("#editRole").val();
    // extracts the value in the forms
    const data = { id: parseInt(id, 10), firstName, lastName, address, gender, email, phoneNo, role };
    // the way the data being sent back into the database will appear.

    if (
      firstName === "" ||
      lastName === "" ||
      role == "" ||
      phoneNo == "" ||
      email == "" ||
      gender == "" ||
      address == ""
    ) {
      alert("Please fill in the fields");
    //   Checks that all the input fields are filled.
    } else {
      $.ajax({
        url: path,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json"
      });

      alert("Employee Updated successfully");
    }
  });
// Once all fields are filled, it updates sucessfuly.
}



// Deletes a Employee
$("#comot").click(function(e) {
  e.preventDefault();
// To extract all the id of checkboxes that has been ticked so they can be deleted
  $("input:checkbox[class=chk]:checked").each(function() {
    const deleter = $(this).attr("id");

    debugger;
    $.ajax({
      url: `http://localhost:3000/employees/${deleter}`,
      method: "DELETE"
    });
  });
});
