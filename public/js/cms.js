$(document).ready(function() {
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var authorSelect = $("#author");
  $(cmsForm).on("submit", handleFormSubmit);
  var url = window.location.search;
  var postId;
  var authorId;
  var updating = false;

  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }

  getAuthors();

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
      return;
    }
    var newPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      AuthorId: authorSelect.val()
    };

    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/entry";
    });
  }

  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
    case "post":
      queryUrl = "/api/posts/" + id;
      break;
    case "author":
      queryUrl = "/api/students/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.AuthorId || data.id);
        titleInput.val(data.title);
        bodyInput.val(data.body);
        authorId = data.AuthorId || data.id;
        updating = true;
      }
    });
  }

  function getAuthors() {
    $.get("/api/students", renderAuthorList);
  }
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/students";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }

  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
      .then(function() {
        window.location.href = "/entry";
      });
  }
});
