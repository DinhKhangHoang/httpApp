var listUsers = [];

async function getData() {
  $.get("/users", function (data, status) {
    console.log(data);
    listUsers = data.data.data;
    for (let userIndex in listUsers) {
      $("#products").append(
        `
          <div class="item col-xs-4 col-lg-4">
            <div class="thumbnail card">
              <div class="img-event">
                <img
                  class="group list-group-image img-fluid"
                  src="${listUsers[userIndex].avatar}"
                  alt=""
                />
              </div>
              <div class="caption card-body">
                <h4 class="group card-title inner list-group-item-heading">
                  ${
                    listUsers[userIndex].first_name +
                    " " +
                    listUsers[userIndex].last_name
                  }
                </h4>
                <p class="group inner list-group-item-text">
                  Description
                </p>
                <div class="row">
                  <div class="col-xs-12 col-md-6">
                    <p class="lead">
                      ${listUsers[userIndex].email}
                    </p>
                  </div>
                  <div class="col-xs-12 col-md-6">
                    <a class="btn btn-success" href=""
                      >Edit</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
      );
    }
  });
}

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
