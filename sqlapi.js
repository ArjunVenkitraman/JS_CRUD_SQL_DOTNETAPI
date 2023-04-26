function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://localhost:7126/api/Registrations");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["username"] + "</td>";
        trHTML += "<td>" + object["useremail"] + "</td>";
        trHTML += "<td>" + object["password"] + "</td>";
        trHTML += "<td>" + object["mobile"] + "</td>";
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

function showUserCreateBox() {
  Swal.fire({
    title: "Create user",
    html:
      '<input id="id" type="hidden">' +
      '<input id="username" class="swal2-input" placeholder="Name">' +
      '<input id="useremail" class="swal2-input" placeholder="email">' +
      '<input id="password" class="swal2-input" placeholder="Password">' +
      '<input id="mobile" class="swal2-input" placeholder="Mobile">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    },
  });
}

function userCreate() {
  const id = document.getElementById("id").value;
  const username = document.getElementById("username").value;
  const useremail = document.getElementById("useremail").value;
  const password = document.getElementById("password").value;
  const mobile = document.getElementById("mobile").value;
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://localhost:7126/api/Registrations/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      //id: id,
      username: username,
      useremail: useremail,
      password: password,
      mobile: mobile,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `https://localhost:7126/api/Registrations/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      //const user = objects["Registration"];
      console.log(objects);
      Swal.fire({
        title: "Edit User",
        html:
          '<input id="id" type="hidden" value="' +
          objects[`${id}`] +
          '">' +
          '<input id="username" class="swal2-input" placeholder="Name" value="' +
          objects["username"] +
          '">' +
          '<input id="useremail" class="swal2-input" placeholder="email" value="' +
          objects["useremail"] +
          '">' +
          '<input id="password" class="swal2-input" placeholder="Password" value="' +
          objects["password"] +
          '">' +
          '<input id="mobile" class="swal2-input" placeholder="Mobile" value="' +
          objects["mobile"] +
          '">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit(id);
        },
      });
    }
  };
}

function userEdit(id) {
  //const id = document.getElementById("id").value;
  const username = document.getElementById("username").value;
  const useremail = document.getElementById("useremail").value;
  const password = document.getElementById("password").value;
  const mobile = document.getElementById("mobile").value;
  console.log(id);
  console.log(username);
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `https://localhost:7126/api/Registrations/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
      username: username,
      useremail: useremail,
      password: password,
      mobile: mobile,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}

function userDelete(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `https://localhost:7126/api/Registrations/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      id: id,
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
      loadTable();
    }
  };
}