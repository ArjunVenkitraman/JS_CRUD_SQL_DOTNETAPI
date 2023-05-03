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
            ')">Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  function userSearch(BuildingType) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          console.log(this.responseText);
          var trHTML = "";
          const objects = JSON.parse(this.responseText);
          for (let object of objects) {
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
              ')">Edit</button>';
            trHTML +=
              '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
              object["id"] +
              ')">Del</button></td>';
            trHTML += "</tr>";
          }
          document.getElementById("mytable").innerHTML = trHTML;
        } else {
          console.error("Error fetching data:", this.status, this.statusText);
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
      title: "Create user",
      html:
        '<input id="id" type="hidden">' +
        '<input id="BuildingType" class="swal2-input" placeholder="BuildingType">' +
        '<input id="Address" class="swal2-input" placeholder="Address">' +
        '<input id="AreaSqFt" class="swal2-input" placeholder="AreaSqFt">' +
        '<input id="ConstructedYear" class="swal2-input" type="date" placeholder="ConstructedYear">'+
        '<input id="Rate" class="swal2-input" placeholder="Rate">'+
        '<input id="Image" class="swal2-input" placeholder="Image">',
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
    const Image = document.getElementById("Image").value;
  
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
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire({ 
        title:"Hello",
        icon:"hello",
        showConfirmButton:false,
        timer:1500,
      });
        loadTable();
      }
    };
  }

  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/buildingSale/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        //const user = objects["objects"];
        console.log(objects);
        Swal.fire({
          title: "Edit User",
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
            '">'+
            '<input id="Rate" class="swal2-input" placeholder="Rate" value="' +
            objects["Rate"] +
            '">'+'<input id="Image" class="swal2-input" placeholder="Image" value="' +
            objects["Image"] +
            '">',
          preConfirm: () => {
            userEdit(id);
          },
        });
      }
    };
  }
  function userEdit(id) {
    const BuildingType = document.getElementById("BuildingType").value;
    const Address = document.getElementById("Address").value;
    const AreaSqFt = document.getElementById("AreaSqFt").value;
    const ConstructedYear = document.getElementById("ConstructedYear").value;
    const Rate = document.getElementById("Rate").value;
    const Image = document.getElementById("Image").value;
    
    console.log(id);
    console.log(BuildingType);
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
          title: 'Updated!',
          text: 'The user has been updated.',
          icon: 'success',
          timerProgressBar: true,
        });
        loadTable();
      }
    };
  }

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
      if (result.value) {
        const xhttp = new XMLHttpRequest();
        xhttp.open(`DELETE`, `http://localhost:3000/buildingSale/${id}`);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(
          JSON.stringify({
            id: id,
          })
        );
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
              timer: 5000, 
              timerProgressBar: true,
            });
          }
        };
      }
    });
  }
  