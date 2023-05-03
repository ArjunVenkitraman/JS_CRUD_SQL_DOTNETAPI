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
            ')"><i class="fa-solid fa-file-pen text-warning" "></i></button>&nbsp';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')"><i class="fa-solid fa-trash  fa-sm" style="color: #ff3300;"></i></button></td>';
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
      "GET",`http://localhost:3000/buildingSale?BuildingType=${BuildingType}`
    );
    xhttp.send();
  }

  function showUserCreateBox() {
    Swal.fire({
      title: "Load building",
      html:
        '<input id="id" type="hidden"><br>' +
        '<i class="fa-solid fa-building-wheat fa-xl"></i><input id="BuildingType" class="swal2-input" placeholder="BuildingType"><br>' +
        '<i class="fa-solid fa-address-card fa-xl"></i><input id="Address" class="swal2-input" placeholder="Address"><br>' +
        '<i class="fa-solid fa-chart-area fa-xl"></i></i><input id="AreaSqFt" class="swal2-input" placeholder="AreaSqFt"><br>' +
        '<i class="fa-solid fa-calendar-days fa-xl"></i><input id="ConstructedYear" class="swal2-input" type="date" placeholder="ConstructedYear" style="width:62%"><br>'+
        '<i class="fa-solid fa-sack-dollar fa-xl"></i><input id="Rate" class="swal2-input" placeholder="Rate"><br>'+
        '<i class="fa-solid fa-image fa-xl"></i><input type="file" style="width:282px" id="Image" class="swal2-input"  placeholder="Image">',
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
  
   
    if(validate()==true){
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
        showConfirmButton:true,
        timer:1500,
      });
        loadTable();
      }
    };
  }
  }

  function validate() {
    //field values
    const BuildingType = document.getElementById("BuildingType").value;
    const Address = document.getElementById("Address").value;
    const AreaSqFt = document.getElementById("AreaSqFt").value;
    const ConstructedYear = document.getElementById("ConstructedYear").value;
    const Rate= document.getElementById("Rate").value;

 //regular expressions
 const areaReg = /^[a-zA-Z\s]{2,32}$/;
 const yearReg = /^[a-zA-Z\s]{2,32}$/;
 const rateReg =/^[a-zA-Z\s]{2,32}$/;

 if (BuildingType == "" || Address == "" || AreaSqFt == "" || ConstructedYear == "" || Rate == "") {
     Swal.fire({
         title: "Fields should not be empty",
         showConfirmButton: true,
         icon: "error"
     }).then((res)=> {
        if(res.value){
          showUserCreateBox();
        }
     });
     return false;
 }
 if (!BuildingType.match(areaReg)) {

     Swal.fire({
         title: "Invalid Input",
         text: "Name should only contain alphabetical letters",
         icon: "error",
         showConfirmButton: true,
     })
     return false;
 }
 if (!Address.match(yearReg)) {

     Swal.fire({
         title: "Invalid Input",
         text: "Age should only contain numbers",
         icon: "error",
         showConfirmButton: true
     })
     return false;
 }
 if (!Rate.match(rateReg)) {
     Swal.fire({
         title: "Invalid Input",
         text: "Please follow the format (dd-mm-yyyy) for the date  field",
         icon: "error",
         showConfirmButton: true
     })
     return false;
 }

 if (BuildingType.match(areaReg) && Address.match(yearReg) && Rate.match(rateReg)) {
     Swal.fire({
         title: "Successfully Created",
         icon: "success",
         showConfirmButton: true
     })
     return true;
 }
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
  