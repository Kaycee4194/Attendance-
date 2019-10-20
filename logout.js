$(document).ready(function() {
  $("#logout").click(function(e) {
    e.preventDefault();
    //clears the localstorage
    localStorage.removeItem("user");
    //redirect user to homepage
    window.location.href = "./homepage.html";
  });
});
