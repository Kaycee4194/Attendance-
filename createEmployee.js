$(document).ready(
    $("#button3").click(function(e){
        e.preventDefault();
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var address = $("#address").val();
        var gender = $("#gender").val();
        var email = $("#email").val();
        var phoneNo = $("#phoneNo").val();
        var role = $("#role").val();
        // Extracts the data from the input form.
        var data = {firstName, lastName, address, gender, email, phoneNo, role}
        // The arrangement on how the data will be presented
        console.log(data);
    if(firstName === ""|| lastName === "" || role ==""||phoneNo ==""||email ==""||gender ==""||address ==""){
        alert("Please fill in the fields")
        // Checks that all fields are filled
    } else {  
        $.ajax({
            url: "http://localhost:3000/employees",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json"
        })

        alert('Employee created successfully');
    }
    })
    // Creates the employee in the database.
)

