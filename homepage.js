$(document).ready(function() {

  $("#button2").click(function(e) {
    e.preventDefault();

    //Extracts user login details
    let inputPassword = $("#passwordHome").val();
    let inputEmail = $("#email1")
      .val()
      .trim();

    //Get request to admin data
    $.get("http://localhost:3000/admin", function(data) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].password === inputPassword && data[j].email === inputEmail) {
          localStorage.setItem('user', inputEmail);
          // sets the login email as a user in localStorage
          window.location.href=("./dashboard.html");
        }
      }
    });
  });
});
