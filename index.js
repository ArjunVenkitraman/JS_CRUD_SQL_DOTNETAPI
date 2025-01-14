// Function to load the table data
function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/buildingSale");
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        // Generate table rows with object data
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["BuildingType"] + "</td>";
        trHTML += "<td>" + object["Address"] + "</td>";
        trHTML += "<td>" + object["AreaSqFt"] + "</td>";
        trHTML += "<td>" + object["ConstructedYear"] + "</td>";
        trHTML += "<td>" + object["Rate"] + "</td>";
        trHTML +=
          '<td><img width="50px" src="' +
          object["Image"] +
          '" class="avatar"></td>';
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')"><i class="fa-solid fa-file-pen text-warning" "></i></button>&nbsp';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')"><i class="fa-solid fa-trash  fa-sm" style="color: #ff3300;"></i></button></td>';
          trHTML +=
          '<td><a href='+object["map"]+' target="_blank"><button type="button" class="btn btn-outline-primary" onclick="showUserEditBo0x(' +
          object["id"] +
          ')"><i class="fa-sharp fa-solid fa-location-dot fa-xl" style="color: #095cec;"></i></button></a>&nbsp</td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}
// Load the table on page load
loadTable();

// Function to search for users by BuildingType
function userSearch(BuildingType) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          // Generate table rows with object data
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML += "<td>" + object["BuildingType"] + "</td>";
          trHTML += "<td>" + object["Address"] + "</td>";
          trHTML += "<td>" + object["AreaSqFt"] + "</td>";
          trHTML += "<td>" + object["ConstructedYear"] + "</td>";
          trHTML += "<td>" + object["Rate"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["Image"] +
            '" class="avatar"></td>';
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')"><i class="fa-solid fa-file-pen text-warning" "></i></button>&nbsp';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')"><i class="fa-solid fa-trash  fa-sm" style="color: #ff3300;"></i></button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    }
  };
  xhttp.open(
    "GET",
    `http://localhost:3000/buildingSale?BuildingType=${BuildingType}`
  );
  xhttp.send();
}

function showUserCreateBox() {
  Swal.fire({
    title: "Load building",
    html:
      '<input id="id" type="hidden"><br>' +
      '<i class="fa-solid fa-building-wheat fa-xl"></i> <select id="BuildingType" class="swal2-input" style="width:62%"> <option value="Residential Buildin">None</option><option value="Residential Building">Residential Building</option> <option value="Educational Buildings">Educational Buildings</option> <option value="Institutional Buildings">Institutional Buildings</option> <option value="Assembly Buildings">Assembly Buildings</option><option value="others">Others</option></select><br>' +
      '<i class="fa-solid fa-address-card fa-xl"></i><input id="Address" class="swal2-input" placeholder="Address"><br>' +
      '<i class="fa-solid fa-chart-area fa-xl"></i></i><input id="AreaSqFt" class="swal2-input" placeholder="AreaSqFt"><br>' +
      '<i class="fa-solid fa-calendar-days fa-xl"></i><input id="ConstructedYear" class="swal2-input" type="date" placeholder="ConstructedYear" style="width:62%"><br>' +
      '<i class="fa-solid fa-sack-dollar fa-xl"></i><input id="Rate" class="swal2-input" placeholder="Rate"><br>',
    // '<i class="fa-solid fa-image fa-xl"></i><input type="file" style="width:282px" id="Image" class="swal2-input"  placeholder="Image">',
    preConfirm: () => {
      userCreate();
    },
  });
}

function userCreate() {
  const BuildingType = document.getElementById("BuildingType").value;
  const Address = document.getElementById("Address").value;
  const AreaSqFt = document.getElementById("AreaSqFt").value;
  const ConstructedYear = document.getElementById("ConstructedYear").value;
  const Rate = document.getElementById("Rate").value;
  var Image;
  var map;

  // Set default image if no file is selected

  if (BuildingType === "Residential Building") {
    Image = "assets/images/Residential.webp";
    map="https://goo.gl/maps/NSP7b5U9MkuXL1Hd6";
  } else if (BuildingType === "Educational Buildings") {
    Image = "assets/images/education.avif";
    map="https://goo.gl/maps/8pb41QRpib775UVT7";
  }
  else if (BuildingType === "Institutional Buildings") {
    Image = "assets/images/industrial.jpg";
    map="https://goo.gl/maps/XA39iaNmocZ4t4kN7";
  }
  else if (BuildingType === "Assembly Buildings") {
    Image = "assets/images/assembly.jpg";
    map="https://goo.gl/maps/9UHAxkzZ8mDZ5e2p7";
  }
  else {
    Image = "assets/images/default.svg";
    map="https://goo.gl/maps/D2SZ2fBAJPZAVzAe9";
  }

  if (validate() == true) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/buildingSale/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        BuildingType: BuildingType,
        Address: Address,
        AreaSqFt: AreaSqFt,
        ConstructedYear: ConstructedYear,
        Rate: Rate,
        Image: Image,
        map:map
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire({
          title: "Hello",
          icon: "success",
        });
      }
    };
  }
  loadTable();
}

function validate() {
  //field values
  const BuildingType = document.getElementById("BuildingType").value;
  const Address = document.getElementById("Address").value;
  const AreaSqFt = document.getElementById("AreaSqFt").value;
  const ConstructedYear = document.getElementById("ConstructedYear").value;
  const Rate = document.getElementById("Rate").value;

  //regular expressions
  const areaReg = /^[0-9]*\.?[0-9]*$/;
  const rateReg = /^[a-zA-Z0-9.]+$/;

  if (BuildingType == "" || Address == "" || AreaSqFt == "" || ConstructedYear == "" || Rate == "") {
    Swal.fire({
      title: "Fields should not be empty",
      showConfirmButton: true,
      icon: "error"
    }).then((res) => {
      if (res.value) {
        showUserCreateBox();
      }
    });
    return false;
  }

  if (!AreaSqFt.match(areaReg)) {

    Swal.fire({
      title: "Invalid Input",
      text: "AreaSqFt should only contain numbers",
      icon: "error",
      showConfirmButton: true
    })
    return false;
  }
  if (!Rate.match(rateReg)) {
    Swal.fire({
      title: "Invalid Input",
      text: "It can contain only numbers",
      icon: "error",
      showConfirmButton: true
    })
    return false;
  }

  if (AreaSqFt.match(areaReg) && Rate.match(rateReg)) {
    Swal.fire({
      title: "Successfully Created",
      icon: "success",
      showConfirmButton: true
    })
    return true;
  }
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/buildingSale/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      BuildingType: BuildingType,
      Address: Address,
      AreaSqFt: AreaSqFt,
      ConstructedYear: ConstructedYear,
      Rate: Rate,
      Image: Image,
    })
  );
}

// Function to show the user edit box
function showUserEditBox(id) {
  console.log(id);
  // Retrieve the user data based on the provided id
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/buildingSale/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      //const user = objects["objects"];
      console.log(objects);
      Swal.fire({
        title: "Edit Building",
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="BuildingType" class="swal2-input" placeholder="BuildingType" value="' +
          objects["BuildingType"] +
          '">' +
          '<input id="Address" class="swal2-input" placeholder="Address" value="' +
          objects["Address"] +
          '">' +
          '<input id="AreaSqFt" class="swal2-input" placeholder="AreaSqFt" value="' +
          objects["AreaSqFt"] +
          '">' +
          '<input id="ConstructedYear" class="swal2-input" placeholder="ConstructedYear" value="' +
          objects["ConstructedYear"] +
          '">' +
          '<input id="Rate" class="swal2-input" placeholder="Rate" value="' +
          objects["Rate"] +
          '">' + '<input id="Image" class="swal2-input" type="hidden" placeholder="Image" value="' +
          objects["Image"] +
          '">',
        preConfirm: () => {
          userEdit(id);
        },
      });
    }
  };
}

// Function to update the user data
function userEdit(id) {
  const BuildingType = document.getElementById("BuildingType").value;
  const Address = document.getElementById("Address").value;
  const AreaSqFt = document.getElementById("AreaSqFt").value;
  const ConstructedYear = document.getElementById("ConstructedYear").value;
  const Rate = document.getElementById("Rate").value;
  const Image = document.getElementById("Image").value;

  if (validateedit()) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/buildingSale/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        BuildingType: BuildingType,
        Address: Address,
        AreaSqFt: AreaSqFt,
        ConstructedYear: ConstructedYear,
        Rate: Rate,
        Image: Image,
      })
    );

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire({
          title: "Updated!",
          text: "The data has been updated.",
          icon: "success",
          timerProgressBar: true,
        });
        loadTable();
      }
    };
  }
}

function validateedit() {
  const BuildingType = document.getElementById("BuildingType").value;
  const Address = document.getElementById("Address").value;
  const AreaSqFt = document.getElementById("AreaSqFt").value;
  const ConstructedYear = document.getElementById("ConstructedYear").value;
  const Rate = document.getElementById("Rate").value;

  // Regular expressions
  const areaReg = /^[0-9]*\.?[0-9]*$/;
  const rateReg = /^[a-zA-Z0-9.]+$/;

  if (BuildingType == "" || Address == "" || AreaSqFt == "" || ConstructedYear == "" || Rate == "") {
    Swal.fire({
      title: "Fields should not be empty",
      showConfirmButton: true,
      icon: "error"
    }).then((res) => {
      if (res.value) {
        showUserEditBox();
      }
    });
    return false;
  }

  if (!AreaSqFt.match(areaReg)) {
    Swal.fire({
      title: "Invalid Input",
      text: "AreaSqFt should only contain numbers",
      icon: "error",
      showConfirmButton: true
    });
    return false;
  }

  if (!Rate.match(rateReg)) {
    Swal.fire({
      title: "Invalid Input",
      text: "Please enter a valid Rate",
      icon: "error",
      showConfirmButton: true
    });
    return false;
  }

  return true;
}

// ****************************************************************** Function to delete a user ********************************************************************* 
function userDelete(id) {
  console.log(id);
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const xhttp = new XMLHttpRequest();
      xhttp.open(`DELETE`, `http://localhost:3000/buildingSale/${id}`);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire({
            title: "Deleted!",
            text: "The user has been deleted.",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
          });
          loadTable();
        }
      };
    }
  });
}
