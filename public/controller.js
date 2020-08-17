var listUsers = [];

$(document).ready(function () {
  getData();
  $("#list").click(function (event) {
    event.preventDefault();

    $("#products .item").addClass("list-group-item");
  });
  $("#grid").click(function (event) {
    event.preventDefault();
    $("#products .item").removeClass("list-group-item");
    $("#products .item").addClass("grid-group-item");
  });
});

function createCardUser(user) {
  return `
    <div id = ${user.id} class="item col-xs-4 col-lg-4">
    <div class="thumbnail card">
      <div class="img-event">
        <img
          class="group list-group-image img-fluid"
          src="${user.avatar}"
          alt=""
        />
      </div>
      <div class="caption card-body">
        <h4 class="group card-title inner list-group-item-heading">
          ${user.first_name + " " + user.last_name}
        </h4>
        <p class="group inner list-group-item-text">
          Description
        </p>
        <div class="row">
          <div class="col-xs-12 col-md-12">
            <p class="lead">
              ${user.email}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-3">
            <button class="btn btn-success" 
              data-toggle="modal"
              data-target="#squarespaceModal"
              onclick="setDefaultInfoForUpdateUser(${user.id})"
            >Edit</button>
          </div>
          <div class="col-xs-12 col-md-3">
            <button class="btn btn-danger" 
              onclick="deleteUserHandler(${user.id})"
            >Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
}

async function getData() {
  $.get("/users", function (data, status) {
    if (data !== null) {
      console.log(data);
      listUsers = data.data.data;
      for (let userIndex in listUsers) {
        $("#products").append(createCardUser(listUsers[userIndex]));
      }
    }
  });
}

function postUserHandler(event) {
  event.preventDefault();
  const user = {
    avatar: document.getElementById("avatar").value,
    first_name: document.getElementById("firstname").value,
    last_name: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
  };
  $.post("/users", user, function (data, status) {
    if (data !== null) {
      var userSuccess = data.data;
      userSuccess.id = parseInt(userSuccess.id);
      listUsers.push(userSuccess);
      console.log(listUsers);
      $("#products").append(createCardUser(userSuccess));
    }
  });
}

function updateUserHandler(event) {
  event.preventDefault();
  const user = {
    id: document.getElementById("inputId").value,
    avatar: document.getElementById("inputAvatarLink").value,
    first_name: document.getElementById("inputFirstName").value,
    last_name: document.getElementById("inputLastName").value,
    email: document.getElementById("inputEmail").value,
  };
  $.ajax({
    url: "/users",
    type: "PUT",
    data: user,
    success: function (data, status) {
      if (data !== null) {
        var updatedUser = data.data;
        updatedUser.id = parseInt(updatedUser.id);
        $(`#${updatedUser.id}`).replaceWith(createCardUser(updatedUser));
        $("#squarespaceModal").trigger("click");
        for (index in listUsers) {
          if (listUsers[index].id === updatedUser.id) {
            listUsers[index] = updatedUser;
          }
        }
        alert("Update successfully!");
      }
    },
  });
}

function deleteUserHandler(userId) {
  const user = findUserById(userId);
  if (user !== null) {
    $.ajax({
      url: "/users",
      type: "DELETE",
      data: user,
      success: function (data, status) {
        if (data !== null) {
          let index = findIndexOfUserById(parseInt(data.data.id));
          $(`#${data.data.id}`).remove();
          listUsers.splice(index, 1);
        }
      },
    });
  }
}

function findUserById(userId) {
  for (index in listUsers) {
    if (listUsers[index].id === userId) {
      return listUsers[index];
    }
  }
  return null;
}

function findIndexOfUserById(userId) {
  for (index in listUsers) {
    if (listUsers[index].id === userId) {
      return index;
    }
  }
  return null;
}

function setDefaultInfoForUpdateUser(userId) {
  let user = findUserById(userId);
  if (user !== null) {
    document.getElementById("inputId").value = user.id;
    document.getElementById("inputAvatarLink").value = user.avatar;
    document.getElementById("inputFirstName").value = user.first_name;
    document.getElementById("inputLastName").value = user.last_name;
    document.getElementById("inputEmail").value = user.email;
  }
}
