$(document).ready(function() {
  $.get("http://localhost:3000/employees", function(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      const row = `<tr><td>${data[i].id}</td><td>${data[i].firstName}</td><td>${data[i].lastName}</td><td><input id=${data[i].id} name=${data[i].firstName} class="chk" type="checkbox" /></td></tr>`;

      $("tbody").append(row);
    }
  });


  
  $("#demo").click(function(e) {
    e.preventDefault();
    const staffInAttendance = [];
    $("input:checkbox[class=chk]:checked").each(function() {
      const staffRecord = {};
      // remember getting the ID out of the checkbox and putting it into an object
      staffRecord.staffId = $(this)
        .attr("id");
      staffRecord.firstName = $(this)
        .attr("name");
        // pushing the object into an array staffinattendance
      staffInAttendance.push(staffRecord);
    });

    const data = { date: Date().toString(), staff_in_attendance: staffInAttendance };
    console.log(data);
    // attendance must be ticked before submitting
    if(staffInAttendance.length === 0){
        alert('Please tick the attendance box')
    }else {
    $.ajax({
      url: "http://localhost:3000/attendance-register",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      dataType: "json"
    });
}
  });
});
