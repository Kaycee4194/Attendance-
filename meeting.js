$(document).ready(function() {
  //when page loads
  $.ajax({
    url: "http://localhost:3000/meetings",
    type: "GET",
    dataType: "json", // added data type
    success: function(res) {
      for (let i = 0; i < res.length; i++) {
        const meetingId = res[i].id;
        $.ajax({
          url: `http://localhost:3000/attendance-register?meetingId=${meetingId}`,
          type: "GET",
          dataType: "json", // added data type
          success: function(data) {
            let attendanceData = data;

            let noInAttendance = 0;

            attendanceData[0].employees.map(x => {
              if (x.attended) {
                noInAttendance++;
              }
            });

            let attendance = "";
            attendance += `
            <tr><td scope="col">${res[i]["title"]}</td><td scope="col">
            ${new Date(res[i]["date"])
              .toUTCString()
              .slice(0, -4)}</td><td scope="col">${
              attendanceData[0].employees.length
            }</td><td scope="col">${noInAttendance}</td><td><button id=${meetingId} onclick="markAttendance(this.id)" data-toggle="modal" data-target="#markAttendance">Mark</button></td></tr>`;

            const meetingData = attendance + `</br>`;
            $("#meeting-details").append(meetingData);
          }
        });
      }
    }
  });

  $("#createMeeting").click(function(e) {
    e.preventDefault();

    $.ajax({
      url: `http://localhost:3000/employees`,
      type: "GET",
      dataType: "json", // added data type
      success: function(employees) {
        let meetingParticipants = "";

        employees.map(x => {
          meetingParticipants += `
            <div>${x.firstName}<input id='${x.id}' name=${x.firstName} class="addEmployees" type="checkbox"/><div></br>
          `;
        });

        document.getElementById("attendees").innerHTML = meetingParticipants;
      }
    });
  });
});

function tick(name) {
  console.log(name);
  const checked = $(this).attr("checked");
  $(this).prop("checked", !checked);
}

function markAttendance(id) {
  $.ajax({
    url: `http://localhost:3000/attendance-register?meetingId=${id}`,
    type: "GET",
    dataType: "json", // added data type
    success: function(data) {
      let attendanceData = data;
      let meetingParticipants = "";

      attendanceData[0].employees.map(x => {
        if (x.attended) {
          meetingParticipants += `
            <div>${x.firstName}<input id=${x.staffId} attendance=${data[0].id} meeting=${id} name=${x.firstName} class="mark" type="checkbox" onclick="tick(this.name)" checked=true /></div></br>
          `;
        } else {
          meetingParticipants += `
            <div>${x.firstName}<input id=${x.staffId} attendance=${data[0].id} meeting=${id} name=${x.firstName} class="mark" type="checkbox" onclick="tick(this.name)"/></div></br>
          `;
        }
      });

      document.getElementById("attendee").innerHTML = meetingParticipants;
    }
  });

  $("#saveAttendance").click(function(e) {
    e.preventDefault();
    let staffRecords = { employees: [] };

    let id;
    let meetingId;
    $("input:checkbox[class=mark]").each(function() {
      const staffRecord = {};

      const x = $(this);

      id = $(this).attr("attendance");
      meetingId = $(this).attr("meeting");

      staffRecord.staffId = $(this).attr("id");
      staffRecord.firstName = $(this).attr("name");

      if (x.prop("checked")) {
        staffRecord.attended = true;
      } else {
        staffRecord.attended = false;
      }

      staffRecords.employees.push(staffRecord);
      staffRecords;
    });

    staffRecords.id = parseInt(id);
    staffRecords.meetingId = parseInt(meetingId);

    $.ajax({
      url: `http://localhost:3000/attendance-register/${id}`,
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify(staffRecords),
      dataType: "json",
      success: function(data) {
        alert("Attendance have been taken");
      }
    });
  });
}

$("#createMeeting1").click(function(e) {
  e.preventDefault();

  const meetingTitle = $("#meetingTitle").val();

  if (!meetingTitle) {
    alert("Please fill in the meeting title");
    return;
  }

  const attendees = [];

  $("input:checkbox[class=addEmployees]:checked").each(function() {
    const x = this;
    const staffId = $(x).attr("id");
    const firstName = $(x).attr("name");
    const attended = false;

    attendees.push({ staffId, firstName, attended });
  });

  if (!attendees.length) {
    alert("Please select employees for the meeting");
    return;
  }

  const date = Date.now();

  const meetingDetails = {
    title: meetingTitle,
    date
  };

  $.ajax({
    url: "http://localhost:3000/meetings",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(meetingDetails),
    dataType: "json",
    success: function(data) {
      const attendanceReg = {
        meetingId: data.id,
        employees: attendees
      };

      $.ajax({
        url: "http://localhost:3000/attendance-register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(attendanceReg),
        dataType: "json",
        success: function(data) {
          alert("Success!!!");
        }
      });
    }
  });
});
