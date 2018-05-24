$(document).ready(function() {
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");

  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  getAuthors();

  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    if (!nameInput.val().trim().trim()) {
      return;
    }
    upsertAuthor({
      name: nameInput
        .val()
        .trim()
    });
  }

  function upsertAuthor(authorData) {
    $.post("/api/students", authorData)
      .then(getAuthors);
  }

  function createAuthorRow(authorData) {
    var newTr = $("<tr>");
    newTr.data("author", authorData);
    newTr.append("<td>" + authorData.name + "</td>");
    newTr.append("<td> " + authorData.Posts.length + "</td>");
    newTr.append("<td><a href='/entry?author_id=" + authorData.id + " class='goto'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + authorData.id + " class='create-student'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Student</a></td>");
    return newTr;
  }

  function getAuthors() {
    $.get("/api/students", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }

  function renderAuthorList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("Create student before posting.");
    authorContainer.append(alertDiv);
  }

  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/students/" + id
    })
      .then(getAuthors);
  }
});
