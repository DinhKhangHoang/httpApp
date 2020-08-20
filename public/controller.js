class User {
  constructor(data) {
    this.id = data.id;
    this.avatar = data.avatar;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
  }
  getInfo() {
    return {
      id: this.id,
      avatar: this.avatar,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    };
  }
  createCardUser() {
    return `
      <div id = ${this.id} class="item col-xs-4 col-lg-4">
        <div class="thumbnail card">
          <div class="img-event">
            <img
              class="group list-group-image img-fluid"
              src="${this.avatar}"
              alt=""
            />
          </div>
          <div class="caption card-body">
            <h4 class="group card-title inner list-group-item-heading">
              ${this.first_name + " " + this.last_name}
            </h4>
            <p class="group inner list-group-item-text">
              Description
            </p>
            <div class="row">
              <div class="col-xs-12 col-md-12">
                <p class="lead">
                  ${this.email}
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-md-3">
                <button class="btn btn-success" 
                  data-toggle="modal"
                  data-target="#squarespaceModal"
                  onclick="setDefaultInfoForUpdateUser(${this.id})"
                >Edit</button>
              </div>
              <div class="col-xs-12 col-md-3">
                <button class="btn btn-danger" 
                  onclick="deleteUserHandler(${this.id})"
                >Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
  }
}

var DictionaryUsers = {};

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

async function getData() {
  $.get("/api/users", function (data, status) {
    if (data !== null) {
      let listUsers = data.data;
      for (let index in listUsers) {
        user = new User({ ...listUsers[index] });
        DictionaryUsers[user.id] = user;
        $("#products").append(user.createCardUser());
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
  $.post("/api/users", user, function (data, status) {
    if (data !== null) {
      addedUser = new User({ ...data });
      DictionaryUsers[addedUser.id] = addedUser;
      $("#products").append(addedUser.createCardUser());
      resetForm();
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
    url: "/api/users",
    type: "PUT",
    data: user,
    success: function (data, status) {
      if (data !== null) {
        updatedUser = new User({ ...data });
        DictionaryUsers[updatedUser.id] = updatedUser;
        $(`#${updatedUser.id}`).replaceWith(updatedUser.createCardUser());
        $("#squarespaceModal").trigger("click");
        alert("Update successfully!");
      }
    },
  });
}

function deleteUserHandler(userId) {
  const user = DictionaryUsers[userId];
  if (user !== null) {
    $.ajax({
      url: "/api/users",
      type: "DELETE",
      data: user.getInfo(),
      success: function (data, status) {
        if (data !== null) {
          $(`#${userId}`).remove();
          delete DictionaryUsers[userId];
        }
      },
    });
  }
}

function setDefaultInfoForUpdateUser(userId) {
  let user = DictionaryUsers[userId].getInfo();
  if (user !== null) {
    document.getElementById("inputId").value = user.id;
    document.getElementById("inputAvatarLink").value = user.avatar;
    document.getElementById("inputFirstName").value = user.first_name;
    document.getElementById("inputLastName").value = user.last_name;
    document.getElementById("inputEmail").value = user.email;
  }
}

function resetForm() {
  document.getElementById("avatar").value = "";
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
}
