document.addEventListener("DOMContentLoaded", function (event) {
    var userDataNode = document.getElementById("userdatalist");
    var userdata = window.localStorage.getItem("userdata");
    if (userdata != null) {
      userdata = JSON.parse(userdata);
      for (i = 0; i < userdata.length; i++) {
        const element =
          '<div class="col-sm-4"><div class="card card-body" style="width: 20rem"><div class="d-flex justify-content-between"><h4 class="card-title">#' +
          (i + 1) +
          '</h4> <h4 class="card-title"><i class="fa fa-trash" onclick="deleteuser(' +
          i +
          ')"></i></h4></div><p class="card-text">First Name: ' +
          userdata[i].fname +
          '</p><p class="card-text">Last Name: ' +
          userdata[i].lname +
          '</p><p class="card-text">Email: ' +
          userdata[i].email +
          "</p></div></div>";
        if (userDataNode.innerHTML == null) {
          userDataNode.innerHTML = element;
        } else {
          userDataNode.innerHTML += element;
        }
      }
    }
  });
  
  function deleteuser(index) {
    var userdata = window.localStorage.getItem("userdata");
    if (userdata != null) {
      userdata = JSON.parse(userdata);
      userdata.splice(index, 1);
      console.log(userdata);
      alert("user deleted");
      window.localStorage.setItem("userdata", JSON.stringify(userdata));
    //   location.reload();
    }
  }
  
  document.forms["user_form"].onsubmit = function () {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    if (fname == "" || lname == "" || email == "") {
      return alert("please fill all fields");
    }
    var userdata = window.localStorage.getItem("userdata");
    if (userdata == null) {
      const user = { fname: fname, lname: lname, email: email };
      userdata = [user];
      window.localStorage.setItem("userdata", JSON.stringify(userdata));
      alert("user saved");
    //   location.reload();
    } else {
      userdata = JSON.parse(userdata);
      for (i = 0; i < userdata.length; i++) {
        if (userdata[i].email == email) {
          return alert("email already exist");
        }
      }
      if (userdata.length > 20) {
        alert("userdata is full");
      } else {
        const user = { fname: fname, lname: lname, email: email };
        userdata.push(user);
        window.localStorage.setItem("userdata", JSON.stringify(userdata));
        alert("user saved");
        // location.reload();
      }
    }
  };
